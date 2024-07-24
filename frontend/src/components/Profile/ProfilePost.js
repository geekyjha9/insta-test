import React from 'react';

const posts = [
  { id: 1, src: 'https://via.placeholder.com/150' },
  { id: 2, src: 'https://via.placeholder.com/150' },
  { id: 3, src: 'https://via.placeholder.com/150' },
  // Add more posts as needed
];

const ProfilePosts = () => {
  return (
    <div className="grid grid-cols-3 gap-1 p-4">
      {posts.map(post => (
        <img key={post.id} src={post.src} alt={`Post ${post.id}`} className="w-full" />
      ))}
    </div>
  );
};

export default ProfilePosts;
