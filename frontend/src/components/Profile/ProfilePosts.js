import React from "react";

const ProfilePosts = ({images}) => {
    // const posts = [
    //     {id:1, src:"https://via.placeholder.com/150"},
    //     {id:2, src:"https://via.placeholder.com/150"},
    //     {id:3, src:"https://via.placeholder.com/150"}
    // ]
return(
    <div className="p-4 grid grid-cols-3 gap-1">
        {images.map((item)=>(
            <img  src={item} alt={`Post`} className="w-full" />
        ))}
    </div>
)
}

export default ProfilePosts