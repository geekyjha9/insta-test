import React from "react";
import { Link } from "react-router-dom";
import LargeNav from "../components/headers/LargeNav/LargeNav";
import MobileNav from "../components/headers/MobileNav/MobileNav";


export default function Home() {
    return (
        <div className="home w-full min-h-screen ">
            <div className="w-full h-auto flex items-start justify-between lg:gap-x-32 md:gap-16 sm:gap-x-8 gap-x-4 relative" >
                {/* sidebar section */}
                <div className="lg:w-[18%] sm:w-none md:w-none h-[100vh] pt-10 px-3 border-r border-r-gray-500 sticky top-0 left-0 lg:block md:block sm:hidden hidden">
                    <LargeNav></LargeNav>
                </div>
                {/* bottom navbar  */}
                <div className="w-full h-auto py-1 px-3 border-t border-t-[#1d1d1d] fixed bottom-0 left-0 lg:hidden md:hidden sm:block block  z-50">
                    <MobileNav></MobileNav>
                </div>
                {/* feed and right bar  */}
            </div>
        </div>

    )
}