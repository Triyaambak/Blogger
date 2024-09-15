import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { addBlogsContext } from "../redux/features/blogsSlice";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}${
	import.meta.env.VITE_BACKEND_PORT
}`;

const useAddBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const addBlog = async ({ title, content }: { title: string; content: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/blogs/addBlog`,
        {
          blogData: {
            title,
            content,
          }
        },
        { withCredentials: true }
      );
      setId(response.data.blog.id);
      dispatch(addBlogsContext(response.data.blog));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return { loading, id, addBlog };
};

export default useAddBlog;
