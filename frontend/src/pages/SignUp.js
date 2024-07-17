import React from "react";
import logo from "../img/logo.png"

export default function SignUp() {

    const handleSubmit = (event)=>{
        event.preventDefault();
        signup()
    }

    const signup =()=>{
        console.log("Sing up funtion called");
        fetch("http://localhost:4000/signup")
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            {/* main contianer  */}
            <div className="flex w-full max-w-4xl rounded-lg overflow-hidden justify-center">
                {/* signup form contiane r */}
                <div className="w-full md:w-1/2 p-8 md:border-gray-300 md:rouded-lg">
                    <div className="flex flex-col items-center">
                        <img className="h-12 mb-6" src={logo} alt="Logo" />
                        <p className="text-gray-600 text-sm text-center my-5">Sign up to see photos and videos from you friends</p>
                        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Full Name" className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm" />
                            <input type="email" placeholder="Email" className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"  />
                            <input type="text" placeholder="Username" className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm" />
                            <input type="password" placeholder="Password" className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm" />
                            <p className="text-gray-500 text-xs text-center my-5">By signing up, you agree to our <a href="/terms">Terms</a> and <a href="">Privacy Policy</a></p>
                            <button type="submit" className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"> Sign Up </button>
                        </form>
                        <div className="flex items-center my-4 w-full">
                            <div  className="flex-grow border-t border-gray-300"></div>
                            <span  className="px-4 text-gray-400">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <button className="flex items-center justify-center w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:borde-blue=300">Continue With Google </button>
                        <div className="mt-4 text-center text-gray-700">
                            <p>Have an account? <a href="">Log In </a></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
