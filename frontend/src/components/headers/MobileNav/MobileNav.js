import React from "react";
import { FaHome, FaSearch, FaUserFriends, FaUserPlus, FaPlusSquare } from 'react-icons/fa';

const MobileNav = () => {
    const sidebarItems = [
        {
            name: "Search",
            link: "/search",
            icon: <FaSearch className="text-xl" data-testid="FaSearch" />,
        },
        {
            name: "Followers",
            link: "/followers",
            icon: <FaUserFriends className="text-xl" data-testid="FaUserFriends" />,
        },
        {
            name: "Following",
            link: "/following",
            icon: <FaUserPlus className="text-xl" data-testid="FaUserPlus" />,
        },
        {
            name: "Create Post",
            link: "/createpost",
            icon: <FaPlusSquare className="text-xl" data-testid="FaPlusSquare" />,
        },
    ];
    return (
        <div>
            <div className="w-full h-auto">
                <div className="w-full h-auto flex items-center gap-x-2">
                    <a href="/" className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group">
                        <FaHome className="text-xl" data-testid="FaHome" />
                    </a>
                    {sidebarItems.map((item) => (
                        <a href={item.link} key={item.name} className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group">
                            {item.icon}
                        </a>
                    ))}
                    <a href="/profile" className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group">
                        <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Profile" className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MobileNav;
