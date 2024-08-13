import React from "react";
import Modal from "react-modal";
import { FaRegSmile, FaArrowLeft, FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const PostDetailsModal = ({
  isOpen,
  onClose,
  feed,
  comments,
  handleAddComment,
  newComment,
  setNewComment,
  handleKeyDown
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center h-full w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-4/5 mx-4 relative flex flex-col md:flex-row">
        
        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center border-b border-gray-300 pb-2 mb-2 relative">
          <button onClick={onClose} className="absolute left-0 text-gray-500 hover:text-gray-700 text-2xl ml-4">
            <FaArrowLeft />
          </button>
          <p className="text-lg font-semibold mx-auto">Comments</p>
        </div>
        
        {/* Desktop Close Icon */}
        <button
          onClick={onClose}
          className="hidden md:block absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-3xl font-medium"
        >
          <FaTimes />
        </button>

        {/* Post Image */}
        <div className="hidden md:flex w-full md:w-1/2 h-full justify-center items-center bg-gray-100 p-4 rounded-lg">
          <img
            src={feed.postImg}
            alt={feed.caption}
            className="max-h-[75vh] object-cover rounded-lg"
          />
        </div>

        {/* Post Details and Comments */}
        <div className="w-full md:w-1/2 h-full flex flex-col px-4">
          {/* Post Details */}
          <div>
            <div className="flex items-center gap-x-3 mb-4">
              <img
                src={feed.profileImg}
                alt={feed.username}
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
              <p className="text-lg font-semibold">{feed.username}</p>
            </div>
            <p className="text-sm mb-4">{feed.caption}</p>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto mb-4" style={{ maxHeight: '300px' }}>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <p className="font-bold">{comment.postedBy.username}</p>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="w-full flex items-center border-t border-gray-300 pt-2">
            <button className="text-black mr-2">
              <FaRegSmile />
            </button>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2"
              placeholder="Add a Comment ...."
            />
            <button
              onClick={handleAddComment}
              className="ml-2 bg-blue-500 text-white py-1 px-4 rounded"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostDetailsModal;




















// import React from "react";
// import Modal from "react-modal";
// import { FaRegSmile } from "react-icons/fa";

// Modal.setAppElement("#root");

// const PostDetailsModal = ({
//   isOpen,
//   onClose,
//   feed,
//   comments,
//   handleAddComment,
//   newComment,
//   setNewComment,
//   handleKeyDown
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="flex items-center justify-center h-full w-full"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//     >
//       <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-4/5 mx-4 relative flex flex-col md:flex-row">
//         <button
//           onClick={onClose}
//           className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-4xl"
//         >
//           &times;
//         </button>

//         {/* Post Image */}
//         <div className="hidden md:flex w-full md:w-1/2 h-full justify-center items-center bg-gray-100 p-4 rounded-lg">
//           <img
//             src={feed.postImg}
//             alt={feed.caption}
//             className="max-h-[75vh] object-cover rounded-lg"
//           />
//         </div>

//         {/* Post Details and Comments */}
//         <div className="w-full md:w-1/2 h-full flex flex-col px-4">
//           {/* Post Details */}
//           <div>
//             <div className="flex items-center gap-x-3 mb-4">
//               <img
//                 src={feed.profileImg}
//                 alt={feed.username}
//                 className="w-12 h-12 rounded-full border-2 border-gray-300"
//               />
//               <p className="text-lg font-semibold">{feed.username}</p>
//             </div>
//             <p className="text-sm mb-4">{feed.caption}</p>
//           </div>

//           {/* Comments List */}
//           <div className="flex-1 overflow-y-auto mb-4" style={{ maxHeight: '300px' }}>
//             {comments.map((comment) => (
//               <div key={comment.id} className="mb-2">
//                 <p className="font-bold">{comment.postedBy.username}</p>
//                 <p>{comment.comment}</p>
//               </div>
//             ))}
//           </div>

//           {/* Add Comment */}
//           <div className="w-full flex items-center border-t border-gray-300 pt-2">
//             <button className="text-black mr-2">
//               <FaRegSmile />
//             </button>
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2"
//               placeholder="Add a Comment ...."
//             />
//             <button
//               onClick={handleAddComment}
//               className="ml-2 bg-blue-500 text-white py-1 px-4 rounded"
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default PostDetailsModal;



