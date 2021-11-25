import React, { useEffect } from "react";
import { authService,dbService } from "../fbase";
import {useNavigate} from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = ({userObj}) => {
    const navigate = useNavigate();

    const handleLogOut=()=>{
        authService.signOut();
        navigate("/");
    }

    const getNweets= async()=>{

    }

    useEffect(()=>{
        getNweets();
    },[])
    return(
        <>
        <span>Profile</span>
        <button onClick={handleLogOut}>Log out</button>
        </>
    )

}

export default Profile