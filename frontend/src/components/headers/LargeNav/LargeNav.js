import React from "react";
import InstagramLogo from "../../../img/logo.png";
import { FaInstagram, FaHome, FaSearch, FaUserFriends, FaUserPlus, FaPlusSquare } from 'react-icons/fa';

const LargeNav = () => {
    const sidebarItems = [
        {
            name: "Search",
            link: "/search",
            icon: <FaSearch className="text-xl" />,
        },
        {
            name: "Followers",
            link: "/followers",
            icon: <FaUserFriends className="text-xl" />,
        },
        {
            name: "Following",
            link: "/following",
            icon: <FaUserPlus className="text-xl" />,
        },
        {
            name: "Create Post",
            link: "/createpost",
            icon: <FaPlusSquare className="text-xl" />,
        },
        {
            name: "Profile",
            link: "/profile",
            icon: <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" className="w-5 h-5 object-contain" />,
        },
    ];
    return (
        <>
            <div className="w-full h-full relative">
                <a href="/" className="mb-10 px-2 lg:block md:hidden sm:hidden hidden">
                    <img className="w-28 h-auto" src={InstagramLogo} alt="Instagram Logo" />
                </a>

                <div className="w-full h-auto flex items-start flex-col gap-y-2">
                    <a href="/" className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group">
                        <FaHome className="text-xl" />
                        <p className="text-lg lg:block md:hidden sm:hidden hidden">
                            Home
                        </p>
                    </a>
                    {sidebarItems.map((item) => (
                        <a href={item.link} key={item.name} className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group">
                            {item.icon}
                            <p className="text-base text-lg lg:block md:hidden sm:hidden hidden">
                                {item.name}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LargeNav;
