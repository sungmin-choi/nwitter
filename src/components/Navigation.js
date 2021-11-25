import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({userObj}) => {
    const [userName,setUserName]=useState("");
    useEffect(()=>{
        if(userObj){setUserName(userObj.displayName);
        }
       },[userObj]);
    return (
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userName}의 profile</Link>
            </li>

        </nav>
    )
            
    };

export default Navigation;