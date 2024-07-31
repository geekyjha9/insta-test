import React, { useEffect, useState } from "react";
import ProfileBio from "../components/Profile/ProfileBio";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfilePosts from "../components/Profile/ProfilePosts";

const API_URL = window.location.origin.replace("3000", "5000");

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`, // Assuming the token is stored in localStorage
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        
      }
    };

    fetchProfileData();
  }, []);

  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="max-w-4xl w-full lg:w-[70%] h-auto mx-auto mt-9 mb-9 pt-9">
      <ProfileHeader username={profileData.user.username} size = {profileData.images.length} />
      <ProfileBio user={profileData.user} />
      <ProfilePosts images={profileData.images} />
    </div>
  );
};

export default Profile;