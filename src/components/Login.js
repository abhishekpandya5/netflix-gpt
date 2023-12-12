import { useState } from "react";
import Header from "./Header";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);

	const handleSignInToggle = () => {
		setIsSignInForm(!isSignInForm);
	};

	return (
		<div>
			<Header />
			<div className="background absolute">
				<img
					src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
					alt="background"
				/>
			</div>
			<form className="login-signup-from w-3/12 p-12 my-36 mx-auto right-0 left-0 bg-black absolute text-white bg-opacity-80 rounded-sm">
				<h1 className="text-3xl font-semibold mb-4">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>
				{!isSignInForm && (
					<input
						type="text"
						placeholder="Full Name"
						className="p-2 mx-0 my-2 rounded-sm bg-gray-700 border-none w-full outline-none"
					/>
				)}
				<input
					type="text"
					placeholder="Email"
					className="p-2 mx-0 my-2 rounded-sm bg-gray-700 border-none w-full outline-none"
				/>
				<input
					type="password"
					placeholder="Password"
					className="p-2 mx-0 my-2 rounded-sm bg-gray-700 border-none w-full outline-none"
				/>
				<button className="p-2 mx-0 my-4 bg-red rounded-sm w-full">
					{isSignInForm ? "Sign In" : "Sign up"}
				</button>

				<p className="cursor-pointer" onClick={handleSignInToggle}>
					{isSignInForm
						? "New to Netflix? Sign up now"
						: "Already a member? Sign in"}
				</p>
			</form>
		</div>
	);
};

export default Login;
