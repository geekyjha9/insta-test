import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {FaHome, FaSearch, FaUserFriends, FaUserPlus ,FaPlusSquare} from "react-icons/fa"
import logo from "../../../img/logo.png"
import { Context } from "../../../contexts/Context";
const LargeNav = ()=>{
    const {setCreatePostOpen,setProfile,setSearch,setisFollowing,setfollowers} = useContext(Context);
    
    const SidebarItems = [
        {
            name:"Search",
            link:"/search",
            icons : <FaSearch className = "text-2xl"/>,
            action:()=>setSearch(true)
        },
        {
            name:"Followers",
            link:"/followers",
            icons : <FaUserFriends className = "text-2xl"/>,
            action:()=>setfollowers(true)
        }
        ,
        {
            name:"Following",
            link:"/following",
            icons : <FaUserPlus className = "text-2xl"/>,
            action:()=>setisFollowing(true)
        },
        {
            name:"Create Post",
            link:"/create",
            icons : <FaPlusSquare className = "text-2xl"/>,
            action: ()=>{
                setCreatePostOpen(true)
                
            }
        },
        {
            name:"Profile",
            link:"/profile",
            icons :<img src ="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Profile" className = "h-6 w-6"/>,
            action:()=>setProfile(true)
        }
    ]
    return (
        <div className = "w-full h-full relative">
<Link to="/" className = "mb-10 px-2 lg:block sm:hidden md:hidden hidden">
    <img src={logo} className = "w-28 h-auto" alt="Instagram Logo"  />
</Link>      
<div className = "w-full h-auto flex items-center flex-col gap-y-2">
<Link to="/" className = "w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group ">
<FaHome className = "text-2xl"/>
    <p className = "text-lg lg:block md:hidden sm:hidden hidden ">Home</p>
     </Link>  

     {SidebarItems.map((item)=>(
        
        <Link to={item.link} key={item.name} onClick={item.action} className = "w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group ">
{item.icons}
    <p className = "text-lg lg:block md:hidden sm:hidden hidden ">{item.name}</p>
     </Link>  
     )     )

     }
</div>
       </div>
    )
}

export default LargeNav 