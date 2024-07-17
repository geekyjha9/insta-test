import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../img/logo.png";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    signup();
  };

  const signup = async () => {
    console.log("Sign up function called");
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          fullname: fullName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Optionally clear form fields after successful signup
        setFullName("");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden justify-center">
        <div className="w-full md:w-1/2 p-8 md:border-gray-300 md:rouded-lg">
          <div className="flex flex-col items-center">
            <img className="h-12 mb-6" src={logo} alt="Logo" />
            <p className="text-gray-600 text-sm text-center my-5">
              Sign up to see photos and videos from your friends
            </p>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-gray-500 text-xs text-center my-5">
                By signing up, you agree to our <a href="/terms">Terms</a> and{" "}
                <a href="">Privacy Policy</a>
              </p>
              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                Sign Up
              </button>
            </form>
            <div className="flex items-center my-4 w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button className="flex items-center justify-center w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">
              Continue With Google
            </button>
            <div className="mt-4 text-center text-gray-700">
              <p>
                Have an account? <a href="">Log In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
