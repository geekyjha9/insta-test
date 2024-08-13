import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import PostDetailsModal from "../../PostDetailsModal/PostDetailsModal";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
  FaRegBookmark,
  FaRegSmile,
} from "react-icons/fa";

const FeedCard = ({ feed, onLike, onUnlike, currentUserId }) => {
  const API_URL = window.location.origin.replace("3000", "4000");
  const [comments, setComments] = useState(feed.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const timeAgo = formatDistanceToNow(new Date(feed.time), { addSuffix: true });
  const isLikedByCurrentUser = feed.likedByUserIds.includes(currentUserId);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts/getComments/${feed.id}`);
        if (response.ok) {

            console.log("response comments", response);
            
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [feed.id]);

  const handleAddComment = async () => {

    console.log("handle add comment method have called");
    
    if (newComment.trim() === "") return;

    console.log("handle add comment method have called");

    console.log(`Bearer ${localStorage.getItem("token")}`, `${API_URL}/api/posts/addComments`, feed.id, currentUserId, newComment);
    
    try {
      const response = await fetch(`${API_URL}/api/posts/addComments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ postId: feed.id, userId: currentUserId, comment: newComment }),
      });
      if (response.ok) {
        const addedComment = await response.json();

        console.log("added comment", addedComment);
        
        setComments((prevComments) => [...prevComments, addedComment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className="w-full mx-auto mb-6 bg-white p-4 rounded-lg">
      {/* Profile Picture, Username, Time */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-x-3">
          <a href="" className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={feed.profileImg}
                alt={feed.username}
                className="w-full h-full object-cover"
              />
            </div>
          </a>
          <div className="flex items-center gap-x-2">
            <p className="text-black text-sm font-medium">{feed.username}</p>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <p className="text-black text-sm">{timeAgo}</p>
          </div>
        </div>
      </div>

      {/* Post Image */}
      <div className="w-full max-h-[75vh] overflow-hidden rounded-lg mb-3">
        <img
          src={feed.postImg}
          alt={feed.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Actions - Like, comment, share, and save */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-x-3">
          <button
            className="text-black"
            onClick={() =>
              isLikedByCurrentUser ? onUnlike(feed.id) : onLike(feed.id)
            }
          >
            {isLikedByCurrentUser ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>

          <button className="text-black" onClick={() => setIsModalOpen(true)}>
            <FaRegComment />
          </button>
          <button className="text-black">
            <FaRegPaperPlane />
          </button>
        </div>

        <button className="text-black">
          <FaRegBookmark />
        </button>
      </div>

      {/* Like Count */}
      <div className="flex items-center gap-x-2 text-base text-black font-medium my-2">
        {feed.likeCount} likes
      </div>

      {/* Caption */}
      <div className="w-full text-sm text-black font-thin mb-2">
        <a href="" className="text-black font-medium">
          {feed.username}{" "}
        </a>{" "}
        {feed.caption}
      </div>

      {/* Comment Count */}
      <div className="w-full text-sm text-gray-600 font-thin mb-2">
        {/* <a href="" className="text-gray-600 font-normal">
          View all {comments.length} comments
        </a> */}

<button 
          onClick={() => setIsModalOpen(true)} 
          className="text-gray-600 font-normal"
        >
          View all {comments.length} comments
        </button>
      </div>

      {/* Comments List */}
      {/* <div className="w-full text-sm text-gray-600 font-thin mb-2">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <p className="font-bold">{comment.postedBy.username}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div> */}

      {/* Add Comment */}
      <div className="w-full flex items-center justify-between border-b border-gray-300 pt-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2"
          placeholder="Add a Comment ...."
        />
        <button className="text-black">
          <FaRegSmile />
        </button>
      </div>


      {/* PostDetailsModal */}
      <PostDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feed={feed}
        comments={comments}
        handleAddComment={handleAddComment}
        newComment={newComment}
        setNewComment={setNewComment}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default FeedCard;





















// import React from "react";
// import { formatDistanceToNow } from "date-fns";
// import {
//   FaHeart,
//   FaRegHeart,
//   FaRegComment,
//   FaRegPaperPlane,
//   FaRegBookmark,
//   FaRegSmile,
// } from "react-icons/fa";

// const FeedCard = ({ feed, onLike, onUnlike, currentUserId }) => {
//   const timeAgo = formatDistanceToNow(new Date(feed.time), { addSuffix: true });
//   const isLikedByCurrentUser = feed.likedByUserIds.includes(currentUserId);

//   return (
//     <div className="w-full mx-auto mb-6 bg-white p-4 rounded-lg">
//       {/* Profile Picture, Username, Time */}
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-x-3">
//           <a href="" className="flex items-center">
//             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
//               <img
//                 src={feed.profileImg}
//                 alt={feed.username}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </a>
//           <div className="flex items-center gap-x-2">
//             <p className="text-black text-sm font-medium">{feed.username}</p>
//             <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
//             <p className="text-black text-sm">{timeAgo}</p>
//           </div>
//         </div>
//       </div>

//       {/* Post Image */}
//       <div className="w-full max-h-[75vh] overflow-hidden rounded-lg mb-3">
//         <img
//           src={feed.postImg}
//           alt={feed.caption}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* User Actions - Like, comment, share, and save */}
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-x-3">
//           <button
//             className="text-black"
//             onClick={() =>
//               isLikedByCurrentUser ? onUnlike(feed.id) : onLike(feed.id)
//             }
//           >
//             {isLikedByCurrentUser ? (
//               <FaHeart className="text-red-500" />
//             ) : (
//               <FaRegHeart />
//             )}
//           </button>

//           <button className="text-black">
//             <FaRegComment></FaRegComment>
//           </button>
//           <button className="text-black">
//             <FaRegPaperPlane></FaRegPaperPlane>
//           </button>
//         </div>

//         <button className="text-black">
//           <FaRegBookmark></FaRegBookmark>
//         </button>
//       </div>

//       {/* Like Count */}
//       <div className="flex items-center gap-x-2 text-base text-black font-medium my-2">
//         {feed.likeCount} likes
//       </div>

//       {/* Caption */}
//       <div className="w-full text-sm text-black font-thin mb-2">
//         <a href="" className="text-black font-medium">
//           {feed.username}{" "}
//         </a>{" "}
//         {feed.caption}
//       </div>

//       {/* Comment Count */}
//       <div className="w-full text-sm text-gray-600 font-thin mb-2">
//         <a href="" className="text-gray-600 font-normal">
//           View all {feed.commentCount} comments
//         </a>
//       </div>

//       {/* Add Comment */}
//       <div className="w-full flex items-center justify-between border-b border-gray-300 pt-2">
//         <input
//           type="text"
//           className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2"
//           placeholder="Add a Comment ...."
//         />
//         <div className="text-black">
//           <FaRegSmile></FaRegSmile>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedCard;







// import React from "react";
// import { formatDistanceToNow} from "date-fns"
// import { FaHeart, FaRegComment, FaRegPaperPlane, FaRegBookmark, FaRegSmile } from "react-icons/fa";

// const FeedCard = ({ feed }) => {
//     const API_URL = window.location.origin.replace("3000", "4000")
//     const timeAgo =  formatDistanceToNow(new Date(feed.time), {addSuffix:true})

//     const likePost = (id) => {
//         fetch(`${API_URL}/like`, {
//           method: "post",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("jwt"),
//           },
//           body: JSON.stringify({
//             postId: id,
//           }),
//         })
//           .then((res) => res.json())
//           .then((result) => {
//             const newData = data.map((posts) => {
//               if (posts._id == result._id) {
//                 return result;
//               } else {
//                 return posts;
//               }
//             });
//             setData(newData);
//             console.log(result);
//           });
//       };

//       const unlikePost = (id) => {
//         fetch(`${API_URL}/unlike`, {
//           method: "post",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("jwt"),
//           },
//           body: JSON.stringify({
//             postId: id,
//           }),
//         })
//           .then((res) => res.json())
//           .then((result) => {
//             const newData = data.map((posts) => {
//               if (posts._id == result._id) {
//                 return result;
//               } else {
//                 return posts;
//               }
//             });
//             setData(newData);
//             console.log(result);
//           });
//       };

//     return (
//         <div className="w-full mx-auto mb-6 bg-white p-4 rounded-lg">
//             {/* Profile Picture , Username , Time  */}
//             <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-x-3">
//                     <a href="" className="flex items-center">
//                         <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
//                             <img src={feed.profileImg} alt={feed.username} className="w-full h-full object-cover" />
//                         </div>
//                     </a>
//                     <div className="flex items-center gap-x-2">
//                         <p className="text-black text-sm font-medium">{feed.username}</p>
//                         <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
//                         <p className="text-black text-sm">{timeAgo}</p>
//                     </div>
//                 </div>
//             </div>
//             {/* Post Image */}
//             <div className="w-full max-h-[75vh] overflow-hidden rounder-lg mb-3">
//                 <img src={feed.postImg} alt={feed.caption} className="w-full h-full object-cover" />
//             </div>

//             {/* User Actions - Like, comment share and save  */}
//             <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-x-3">
//                     <button className="text-black">
//                         <FaHeart></FaHeart>
//                     </button>
//                     <button className="text-black">
//                         <FaHeart></FaHeart>
//                     </button>
//                     <button className="text-black">
//                         <FaRegComment></FaRegComment>
//                     </button>
//                     <button className="text-black">
//                         <FaRegPaperPlane></FaRegPaperPlane>
//                     </button>
//                 </div>

//                 <button className="text-black">
//                     <FaRegBookmark></FaRegBookmark>
//                 </button>

//             </div>
//              {/* Like Count */}
//              <div className="flex items-center gap-x-2 text-base text-black font-medium my-2">
//                 {feed.likeCount} likes
//              </div>

//              {/* Caption */}
//              <div className="w-full text-sm text-black font-thin mb-2">
//                 <a href="" className="text-black font-medium">{feed.username} </a> {feed.caption}
//              </div>

//              {/* Comment Count */}
//              <div className="w-full text-sm text-gray-600 font-thin mb-2">
//                 <a href="" className="text-gray-600 font-normal">View all {feed.commentCount} comments</a>
//              </div>

//              {/* Add Comment  */}
//              <div className="w-full flex iteme-center justify-between border-b border-gray-300 pt-2">
//                 <input type="text" className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2" placeholder="Add a Comment ...." />
//                 <div className="text-black">
//                     <FaRegSmile></FaRegSmile>
//                 </div>
//              </div>

//         </div>
//     )
// }
// export default FeedCard

{
  /* <button className="text-black" onClick={() => onLike(feed.id)}>
                        <FaHeart></FaHeart>
                    </button>
                    <button className="text-black" onClick={() => onUnlike(feed.id)}>
                        <FaHeart></FaHeart>
                    </button> */
}
