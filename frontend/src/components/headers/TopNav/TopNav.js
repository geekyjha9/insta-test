import React from 'react';
import { FaSearch } from 'react-icons/fa';
// import { Link } from "react-router-dom";
import logo from "../../../img/logo.png"


const TopNav = () => {
    return (


        <div className="w-full h-auto flex items-center justify-center bg-light">
            <div className="relative w-full py-2 ">
                <input
                    type="text"
                    className="w-full bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Search"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaSearch />
                </button>
            </div>
        </div>

    )
}

export default TopNav
