import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import COVER_IMAGE from "../assets/HD-wallpaper-abstract-purple-mixed-abstract-purple.jpg";
import { AppContext } from "../context/AppContext";

const colors = {
	primary: "#060606",
	background: "#E0E0E0",
	disabled: "#D9D9D9",
};
function HomePage() {
	const [current, setCurrent] = useState("login");
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const { loggedIn, setLoggedIn } = useContext(AppContext);

	const onsubmit = async () => {
		if (current == "login") {
			try {
				const response = await axios.post("login_wala_api", {
					email,
					password,
				});
				const { data } = response;
				if (response.status === 200) {
					localStorage.setItem("token", data.token);
					setLoggedIn({ email });
					window.location.href = "/dashboard";
				} else {
					console.log(data.message || "Something went wrong.");
				}
			} catch (error) {
				console.log("Something went wrong.");
			}
		} else {
			try {
				const response = await axios.post("signup_wala_api", {
					email,
					username,
					password,
				});
				const { data } = response;
				if (response.status === 200) {
					localStorage.setItem("token", data.token);
					setLoggedIn({ email });
					window.location.href = "/dashboard";
				} else {
					console.log(data.message || "Something went wrong.");
				}
			} catch (error) {
				console.log("Something went wrong.");
			}
		}
		console.log("Submitted");
	};

	return (
		<div className="w-full h-screen flex items-start">
			<div className="relative w-1/2 h-full flex flex-col">
				<div className="absolute top-[25%] left-[10%] flex flex-col">
					<h1 className="text-3xl text-[#FFFFFF] font-extrabold drop-shadow-lg my-12">
						Turn Your Ideas Into Reality
					</h1>
					<p className="text-base text-[#FFFFFF] font-normal drop-shadow-lg">
						Start for free and get exciting attractive offers from the community
					</p>
				</div>
				<img src={COVER_IMAGE} className="w-full h-full object-cover" />
			</div>
			<div className="w-1/2 h-full bg-[#F5F5F5] flex flex-col p-20 justify-between">
				<div className="w-full flex flex-col">
					<div className="flex flex-col mb-10">
						<h3 className="text-3xl font-semibold mb-2">
							{current.charAt(0).toUpperCase() + current.slice(1)}
						</h3>
						<p className="text-base mb-2">
							{current == "login"
								? "Welcome Back! Please Enter Your Credentials."
								: "Create an account to get started."}
						</p>
					</div>
					<div className="w-full flex flex-col">
						<input
							placeholder="Enter Your Email Address"
							className="w-full text- py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
							type="email"
						/>
						{current == "register" && (
							<input
								placeholder="Enter Your Username"
								className="w-full text- py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
								type="text"
							/>
						)}
						<input
							placeholder="Enter Your Password"
							className="w-full text- py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
							type="password"
						/>
					</div>
				</div>
				<div className="w-full flex items-center justify-center">
					<p className="text-sm font-normal text-[#090909]">
						Don't have an account ?{" "}
						<span
							onClick={() => setCurrent("register")}
							className="font-semibold underline underline-offset-2 cursor-pointer"
						>
							Sign Up for free
						</span>
					</p>
				</div>

				<div className="w-full flex flex-col">
					<button
						onClick={() => {
							if (current == "login") {
								onsubmit();
							} else setCurrent("login");
						}}
						className="w-[full] my-1 text-white bg-[#060606] rounded-md p-4 flex items-center justify-center"
					>
						Login
					</button>
					<button
						onClick={() => {
							if (current == "register") {
								onsubmit();
							} else setCurrent("register");
						}}
						className="w-full my-1 border-2 border-black rounded-md p-4 flex items-center justify-center"
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
