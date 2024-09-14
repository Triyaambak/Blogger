import axios from "axios";

const BACKEND_URL: string = `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT
  }`;

const useRemoveAuth = (): void => {
  const removeAuth = async () => {
    await axios.get(`${BACKEND_URL}/api/auth/removeAuth`, { withCredentials: true })
      .catch((e) => console.log(e)
      );
  };
  removeAuth();
};

export default useRemoveAuth;
