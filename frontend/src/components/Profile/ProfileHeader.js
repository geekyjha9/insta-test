import React from 'react';

const ProfileHeader = () => {
  return (
    <div className="flex items-center p-4">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-24 h-24 rounded-full"
      />
      <div className="ml-6">
        <div className="text-2xl font-semibold">username</div>
        <div className="mt-2 flex flex-wrap">
          <span className="mr-4"><strong>100</strong> posts</span>
          <span className="mr-4"><strong>200k</strong> followers</span>
          <span className="mr-4"><strong>180</strong> following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
