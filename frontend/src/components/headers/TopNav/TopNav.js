import React from "react";
import { FaSearch } from "react-icons/fa";

const TopNav = ()=>{
    return(
        <div className="w-full h-auto flex items-center justify-center bg-ligh">
            <div className="relative w-full py-2">
                <input type="text" placeholder="Search" className="w-full bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-600" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaSearch></FaSearch>
                </button>
            </div>
        </div>
    )
}
export default TopNav