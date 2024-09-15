import useValidateAuthContext from "../hooks/useValidateAuthContext";
import { AppBar } from "../components/AppBar";
import { Skeleton } from "../components/Skeleton";
import { BlogCard } from "../components/BlogCard";
import useGetAllBlogs from "../hooks/useGetAllBlogs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

const Blogs = () => {
	const allBlogsContext = useSelector(
		(state: RootState) => state.allBlogsContext
	);
	const completed = useValidateAuthContext();
	const loading = useGetAllBlogs();
	if (loading) {
		return (
			<div className="flex justify-center">
				<div className="w-screen max-w-screen-md">
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			</div>
		);
	}

	return (
		<div>
			{!completed && <AppBar />}
			<div className="flex justify-center">
				<div className="w-screen max-w-screen-md">
					{allBlogsContext.map((blog) => (
						<BlogCard
							key={blog.id}
							id={blog.id}
							authorName={blog.author.name || "Anonymous"}
							title={blog.title}
							content={blog.content}
							publishedDate="30/12/2003"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Blogs;
