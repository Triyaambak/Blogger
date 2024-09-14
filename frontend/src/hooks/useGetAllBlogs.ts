import { useEffect, useState } from "react"
import axios from "axios";

type BlogsType = {
  id: string;
  content: string;
  title: string;
  author: { name: string };
}

type AllBlogsType = BlogsType[]; 

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT}`;

const useGetAllBlogs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<AllBlogsType>([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      setLoading(true);
      try {
        const { data : { data } } = await axios.get(`${BACKEND_URL}/api/blogs/bulk`, { withCredentials: true });
        setAllBlogs(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    };
    getAllBlogs();
  }, []);

  return {
    loading,
    allBlogs,
  }
};

export default useGetAllBlogs;
