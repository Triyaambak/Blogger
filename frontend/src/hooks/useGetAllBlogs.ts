import { useEffect, useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { updateBlogsContext , AllBlogsType } from "../redux/features/blogsSlice";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT}`;

const useGetAllBlogs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getAllBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/blogs/bulk`, { withCredentials: true });
        const data: AllBlogsType = response.data.data;
        dispatch(updateBlogsContext(data));
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    };
    getAllBlogs();
  }, []);

  return loading;
};

export default useGetAllBlogs;
