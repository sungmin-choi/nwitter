import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
    return (
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">profile</Link>
            </li>

        </nav>
    )
            
    };

export default Navigation;