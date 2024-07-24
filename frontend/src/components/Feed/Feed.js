import React from "react";
import FeedCard from "./FeedCard/FeedCard";

const Feed = () => {
    const feed = {
        id: 1,
        profileImg: "https://via.placeholder.com/150",
        username: "john_doe",
        time: "2h",
        postImg: "https://via.placeholder.com/600",
        likeCount: 150,
        mutualFrndImg1: "https://via.placeholder.com/50",
        mutualFrndImg2: "https://via.placeholder.com/50",
        commentCount: 20,
        caption: "Enjoying the sunset!"
      };
    
    return (
        <div className="w-full min-h-screen lg:py-7 sm:py-3 flex flex-col lg:flex-row items-start gap-x-20 mt-5 pt-5 mb-5">
            <div className="w-full lg:w-[70%] h-auto relative">
                <div className="w-full h-auto flex items-center justify-center mt-6 mb-6">
                    <div className="w-full lg:w-[73%] md:w-[73%] sm:w-[80%]">
                        <FeedCard feed={feed}></FeedCard>
                        <FeedCard feed={feed}></FeedCard>
                        <FeedCard feed={feed}></FeedCard>
                    </div>

                </div>

            </div>
            <div className="w-full lg:w-[25%] h-auto lg:block hidden"></div>
        </div>
    )
}
export default Feed