import { Link } from "react-router-dom";

type BlodCardPropsType = {
	id: string;
	authorName: string;
	title: string;
	content: string;
	publishedDate: string;
};

type AvatarPropsType = {
	name: string;
	size?: "small" | "big";
};

const Circle = () => {
	return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
};

export const Avatar = ({ name, size = "small" }: AvatarPropsType) => {
	return (
		<div
			className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
				size === "small" ? "w-6 h-6" : "w-10 h-10"
			}`}
		>
			<span
				className={`font-extralight text-gray-600 dark:text-gray-300 ${
					size === "small" ? "text-xs" : "text-md"
				} `}
			>
				{name[0].toUpperCase()}
			</span>
		</div>
	);
};

export const BlogCard = ({
	id,
	authorName,
	title,
	content,
	publishedDate,
}: BlodCardPropsType) => {
	return (
		<Link to={`/blog/${id}`}>
			<div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
				<div className="flex">
					<Avatar name={authorName} />

					<div className="font-extralight pl-2 text-sm flex justify-center flex-col">
						{authorName}{" "}
					</div>
					<div className="flex justify-center flex-col pl-2">
						<Circle />
					</div>
					<div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
						{publishedDate}
					</div>
				</div>
				<div className="text-xl font-semibold pt-2">{title}</div>
				<div className="text-md font-thin">
					{content.slice(0, 100) + "...."}
				</div>
				<div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
					content.length / 100
				)} minute(s) read`}</div>
			</div>
		</Link>
	);
};
