import useValidateAuthContext from "../hooks/useValidateAuthContext";
import { AppBar } from "../components/AppBar";

const Blogs = () => {
	useValidateAuthContext();
	return (
		<div>
			<AppBar />
		</div>
	);
};

export default Blogs;
