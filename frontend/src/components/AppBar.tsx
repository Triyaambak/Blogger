import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import useRemoveAuth from "../hooks/useRemoveAuth";

export const AppBar = () => {
	const authContextUsername = useSelector(
		(store: RootState) => store.authContext.name
	);
	const navigate = useNavigate();
	return (
		<div className="border-b flex justify-between px-10 py-4">
			<Link
				to={"/blogs"}
				className="flex flex-col justify-center cursor-pointer"
			>
				BLOGGER
			</Link>
			<div>
				<Link to={"/"}>
					<button
						onClick={() => {
							useRemoveAuth();
							navigate("/");
						}}
						type="button"
						className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						Logout
					</button>
				</Link>
				<Link to={`/publish`}>
					<button
						type="button"
						className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						New
					</button>
				</Link>
				<Avatar
					name={authContextUsername}
					size={"big"}
				/>
			</div>
		</div>
	);
};
