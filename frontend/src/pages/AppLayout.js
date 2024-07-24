// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import LargeNav from '../components/headers/LargeNav/LargeNav';
import MobileNav from '../components/headers/MobileNav/MobileNav';
import TopNav from '../components/headers/TopNav/TopNav';

const AppLayout = () => {
    return (
        <div className="home w-full min-h-screen">
            <div className="w-full h-auto flex items-start justify-between  md:gap-x-16 sm:gap-x-8 gap-x-4 relative">
                {/* sidebar  */}
                <div className="lg:w-[18%] sm:w-none md:w-none h-[100vh] pt-10 px-3 border-r border-r-gray-500 sticky top-0 left-0 lg:block sm:hidden md:block hidden">
                    <LargeNav></LargeNav>
                </div>
                <div className="w-full h-auto py-1 px-3 border-t border-t-[#1d1d1d] fixed bottom-0 left-0 lg:hidden md:hidden sm:block z-50 bg-white"><MobileNav></MobileNav></div>
                <div className="w-full h-auto py-1 px-3 border-b border-b-[#1d1d1d] fixed top-0 left-0 lg:hidden md:hidden sm:block z-50 bg-white"><TopNav></TopNav></div>

                <Outlet />
            </div>

        </div>
    );
};

export default AppLayout;
