import React, { useContext, useState } from 'react';
import { Context } from '../../contexts/Context';

const CreatePost = () => {

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const{setCreatePostOpen,isCreatePostOpen} =useContext(Context);

  

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    // Handle post submission logic here
    console.log('Post submitted:', caption, hashtags);
    setCreatePostOpen(false);
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-4 relative">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={()=>setCreatePostOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            className="mb-4 w-full max-w-xs sm:max-w-sm"
            onChange={handleImageChange}
          />
          {image && (
            <img
              src={image}
              alt="Selected preview"
              className="w-full h-auto mb-4 rounded-lg max-w-xs sm:max-w-sm"
            />
          )}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="w-full h-24 p-2 border border-gray-300 rounded-lg mb-4 resize-none max-w-xs sm:max-w-sm"
          />
          <div className="w-full mb-4">
            <label className="block text-gray-700 mb-2">Hashtags:</label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="Enter hashtags..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handlePost}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  
  
)
  
};

export default CreatePost;
