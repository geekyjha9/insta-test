import React from "react";
import ProfileBio from "../components/Profile/ProfileBio";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfilePosts from "../components/Profile/ProfilePosts";

const Profile = ()=>{
    return (
        <div className="max-w-4xl w-full lg:w-[70%] h-auto mx-auto mt-9 mb-9 pt-9 ">
            <ProfileHeader></ProfileHeader>
            <ProfileBio></ProfileBio>
            <ProfilePosts></ProfilePosts>
        </div>
    )
}

export default Profile