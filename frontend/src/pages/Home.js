import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="home">
            <button><Link to={`/signup`}>sing Up</Link></button>
        </div>
    )
}