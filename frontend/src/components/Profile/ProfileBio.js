import React from "react";

const ProfileBio = ({user}) => {
return(
    <div className="p-4">
        <div className="font-semibold">{user.fullname}</div>
        <div className="text-gray-600">Bio Description Should be here</div>
        <a href="" className="text-blue-500">www.exmaple.com</a>
    </div>
)
}

export default ProfileBio