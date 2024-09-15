import useValidateAuthContext from "../hooks/useValidateAuthContext";
import { BlogsType } from "../redux/features/blogsSlice";
import { AppBar } from "./AppBar";

export const FullBlog = ({ blog }: { blog: BlogsType }) => {
	const completed = useValidateAuthContext();
	return (
		<div>
			{!completed && <AppBar />}
			<div className="flex justify-center">
				<div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
					<div className="col-span-8">
						<div className="text-2xl font-extrabold">{blog.title}</div>
						<div className="text-slate-500 pt-2 ">
							Post on 2nd December 2023
						</div>
						<div className="pt-4">{blog.content}</div>
					</div>
					<div className="col-span-4">
						<div className="text-slate-600 text-lg">Author</div>
						<div className="flex">
							<div>
								<div className="text-xl font-bold">
									{blog.author.name[0].toUpperCase() +
										blog.author.name.slice(1).toLowerCase() || "Anonymous"}
								</div>
								<div className="pt-2 text-slate-500">
									Random catch phrase about the author's ability to grab the
									user's attention
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
