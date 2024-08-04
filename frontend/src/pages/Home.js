import React from "react";



import Feed from "../components/Feed/Feed";
import { useOutletContext } from "react-router-dom";


export default function Home(){
    const { newPost } = useOutletContext();
    return(
        <>
         
       
       <Feed newPost={newPost}></Feed>
        </>
       

    )
   
}