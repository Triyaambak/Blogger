import { useEffect, useState } from "react";
import axios from "axios";
import { BlogsType } from "../redux/features/blogsSlice";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}${
	import.meta.env.VITE_BACKEND_PORT
}`;

const useGetBlog = ({ blogId }: { blogId: string }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [blog, setblog] = useState<BlogsType>();

	useEffect(() => {
		const getBlog = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`${BACKEND_URL}/api/blogs/bulk/${blogId}`,
					{
						withCredentials: true,
					}
				);
				setblog(response.data.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		getBlog();
	}, []);

	return { loading, blog };
};

export default useGetBlog;
