import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL: string = `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT
  }`;

const useRemoveAuth = () : boolean => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/auth/removeAuth`, { withCredentials: true })
      .catch((e) => console.log(e)
      );
    setLoading(false);
  }, []);
  return loading;
};

export default useRemoveAuth;
