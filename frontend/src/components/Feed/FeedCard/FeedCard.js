import React from 'react';
import { FaHeart, FaRegComment, FaRegPaperPlane, FaRegBookmark, FaRegSmile } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import Ellipse from "../../../../Icons/Ellipse/Ellipse";
// import Like from "../../../../Icons/Like/Like";
// import Comment from "../../../../Icons/Comment/Comment";
// import Share from "../../../../Icons/Share/Share";
// import Save from "../../../../Icons/Save/Save";
// import Emoji from "../../../../Icons/Emoji/Emoji";

const FeedCard = ({ feed }) => (
 
  

    <div className="w-full mx-auto mb-6 bg-white p-4 rounded-lg">
        {/* Profile Picture, Username, and Time */}
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-x-2">
                <a href="/" className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
                        <img src={feed.profileImg} alt={feed.username} className="w-full h-full object-cover" />
                    </div>
                </a>
                <div className="flex items-center gap-x-2">
                    <p className="text-black text-sm font-medium">{feed.username}</p>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <p className="text-black text-sm ">{feed.time}</p>
                </div>
            </div>
            {/* <Ellipse /> */}
        </div>

        {/* Post Image */}
        <div className="w-full max-h-[75vh] overflow-hidden rounded-lg mb-3">
            <img src={feed.postImg} alt={feed.caption} className="w-full h-full object-cover" />
        </div>

        {/* User Actions (like, comment, share, save) */}
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-x-3">
                <button className="text-black">
                    {/* Like icon */}
                    <FaHeart />
                </button>
                <button className="text-black">
                    {/* Comment icon */}
                    <FaRegComment />
                </button>
                <button className="text-black">
                    {/* Share icon */}
                    <FaRegPaperPlane />
                </button>
            </div>
            <button className="text-black">
                {/* Save icon */}
                <FaRegBookmark />
            </button>
        </div>

        {/* Like Count */}
        <div className="flex items-center gap-x-2 text-base text-black font-medium my-2">
            {feed.likeCount} likes
        </div>

        {/* Caption */}
        <div className="w-full text-sm text-black font-thin mb-2">
            <a href="/" className="text-black font-medium">{feed.username}</a> {feed.caption}
        </div>

        {/* Comment Count */}
        <div className="w-full text-sm text-gray-600 font-thin mb-2">
            <a href="/" className="text-gray-600 font-normal">View all {feed.commentCount} comments</a>
        </div>

        {/* Add Comment */}
        <div className="w-full flex items-center justify-between border-b border-gray-300 pt-2">
            <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2"
                placeholder="Add a comment..."
            />
            <button className="text-black">
                {/* Emoji icon */}
                <FaRegSmile />
            </button>
        </div>
    </div>
);



export default FeedCard;
