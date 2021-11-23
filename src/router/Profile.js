import React from "react";
import { authService } from "../fbase";
import {useNavigate} from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const handleLogOut=()=>{
        authService.signOut();
        navigate("/");
    }
    return(
        <>
        <span>Profile</span>
        <button onClick={handleLogOut}>Log out</button>
        </>
    )

}

export default Profile