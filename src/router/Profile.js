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
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input className="formInput" autoFocus onChange={onChange} type="text" value={newDisplayName} placeholder="put your new name"/>
            <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={handleLogOut}>
        Log Out
      </span>
        </div>
    )

}

export default Profile