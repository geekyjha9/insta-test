import React, { useState } from 'react';
import Modal from 'react-modal';



Modal.setAppElement(document.getElementById('root')); // Make sure to set the app element

const CreatePost = ({ closeModal }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleShare = () => {
    // Handle post share logic here
    console.log('Post shared:', {
      image: selectedImage,
      caption,
      hashtags,
    });
    closeModal();
  };

  return (
    <Modal
      isOpen={true} // Modal should always be open when rendered
      onRequestClose={closeModal}
      className="flex items-center justify-center h-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-center">Create Post</h2>
        <div className="mb-4">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="w-full h-64 object-cover mb-2 rounded-md" />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
              <label className="cursor-pointer">
                <span className="text-gray-600">Select a photo</span>
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          )}
        </div>
        <textarea
          placeholder="Add a caption"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add hashtags"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <button
          onClick={handleShare}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Share
        </button>
      </div>
    </Modal>
  );
};

export default CreatePost;
