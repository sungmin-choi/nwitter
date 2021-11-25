import React, { useState } from "react";
import { authService} from "../fbase";
import {useNavigate} from 'react-router-dom';
import {updateProfile } from "firebase/auth";

const Profile = ({userObj,refreshUser}) => {
    const [newDisplayName,setNewDisplayName] =useState(userObj.displayName);

    const navigate = useNavigate();

    const handleLogOut=()=>{
        authService.signOut();
        navigate("/");
        refreshUser();
    }

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNewDisplayName(value);
    }

    const onSubmit=async (event)=>{
        event.preventDefault();
        await updateProfile(authService.currentUser, {
            displayName:newDisplayName
        })
        refreshUser();
    }

    return(
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" value={newDisplayName} placeholder="put your new name"/>
            <input type="submit" value="Edit Name"/>
        </form>
        <button onClick={handleLogOut}>Log out</button>
        </>
    )

}

export default Profile