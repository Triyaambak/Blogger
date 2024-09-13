import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateAuth } from "../redux/features/authSlice";
import { AppDispatch } from "../redux/Store";
import { useNavigate } from "react-router-dom";

const BACKEND_URL: string = `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT
  }`;

const useValidateAuthContext = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const validateAuth = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/auth/getAuth`, {
          withCredentials: true,
        });

        if (
          data &&
          typeof data === "object" &&
          data.id &&
          data.name &&
          data.email &&
          data.id.length > 0 &&
          data.name.length > 0 &&
          data.email.length > 0
        ) {
          dispatch(updateAuth({ id: data.id, name: data.name, email: data.email }));
          navigate("/blogs");
        } else {
          dispatch(updateAuth({ id: "", name: "", email: "" }));
          navigate("/");
        }
      } catch (e) {
        dispatch(updateAuth({ id: "", name: "", email: "" }));
        navigate("/");
      }
    };

    validateAuth();
  }, []); 

};

export default useValidateAuthContext;
