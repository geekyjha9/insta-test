import React from 'react';
import ProfileBio from '../components/Profile/ProfileBio';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfilePosts from '../components/Profile/ProfilePost';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader />
      <ProfileBio />
      <ProfilePosts />
    </div>
  );
};

export default Profile;
