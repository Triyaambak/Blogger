import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, ReactNode, useState } from "react";
import {
	CredentialsStateType,
	updateCredentials,
	UserInputType,
} from "../redux/features/credentialsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import axios from "axios";
import useValidateAuthContext from "../hooks/useValidateAuthContext";

type LabelledInputType = {
	label: string;
	type?: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const BACKEND_URL: string = `${import.meta.env.VITE_BACKEND_URL}${
	import.meta.env.VITE_BACKEND_PORT
}`;

const LabelledInput = ({
	label,
	type,
	placeholder,
	onChange,
}: LabelledInputType): ReactNode => {
	return (
		<div>
			<div>
				<label className="block mb-2 text-sm font-semibold text-black pt-2 ">
					{label}
				</label>
				<input
					onChange={onChange}
					type={type}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
					placeholder={placeholder}
					required
				/>
			</div>
		</div>
	);
};

const Auth = ({ type }: { type: "signin" | "signup" }) => {
	useValidateAuthContext();
	const credentialsInput: CredentialsStateType = useSelector(
		(state: RootState) => state.credentialsContext
	);

	const dispatch = useDispatch<AppDispatch>();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const useAuthReq = async () => {
		setLoading(true);
		try {
			await axios.post(
				`${BACKEND_URL}/api/auth/${type === "signin" ? "signin" : "signup"}`,
				credentialsInput,
				{
					withCredentials: true,
				}
			);
			navigate("/blogs");
			setLoading(false);
		} catch (e: any) {
			alert(e.response.data);
			setLoading(false);
		}
	};

	return (
		<div className="h-screen flex justify-center flex-col">
			<div className="flex justify-center">
				<div>
					<div className="px-10">
						<div className="text-3xl font-extrabold text-center">
							{type === "signup" ? "Create an account" : "Login"}
						</div>
						<div className="text-slate-400  text-center">
							{type === "signin"
								? "Dont have an account? "
								: "Already have an account?"}
							<Link
								className="pl-1 underline"
								to={type === "signin" ? "/signup" : "/"}
							>
								{type === "signin" ? "Sign up" : "Sign in"}
							</Link>
						</div>
					</div>
					<div>
						{type === "signup" ? (
							<LabelledInput
								label="Name"
								type="text"
								placeholder="Enter Name"
								onChange={(e) => {
									const userInput: UserInputType = {
										label: "name",
										value: e.target.value,
									};
									dispatch(updateCredentials(userInput));
								}}
							/>
						) : null}
						<LabelledInput
							label="Email"
							type="email"
							placeholder="Enter Email"
							onChange={(e) => {
								const userInput: UserInputType = {
									label: "email",
									value: e.target.value,
								};
								dispatch(updateCredentials(userInput));
							}}
						/>
						<LabelledInput
							label="Password"
							type="password"
							placeholder="Enter Password"
							onChange={(e) => {
								const userInput: UserInputType = {
									label: "password",
									value: e.target.value,
								};
								dispatch(updateCredentials(userInput));
							}}
						/>
						{loading && (
							<div className="flex justify-center items-center mt-2">
								<div
									style={{
										border: "4px solid rgba(0, 0, 0, 0.1)",
										width: "24px",
										height: "24px",
										borderRadius: "50%",
										borderLeftColor: "#09f",
										animation: "spin 1s linear infinite",
									}}
								></div>
							</div>
						)}

						<style>
							{`
                                @keyframes spin {
                                to {
                                    transform: rotate(360deg);
                                }
                                }
                            `}
						</style>
						<button
							onClick={useAuthReq}
							type="button"
							className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-4"
						>
							{type === "signup" ? "Sign Up" : "Sign in"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
