import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlusCircleFill, BsFillPeopleFill } from 'react-icons/bs';
import { FaUserFriends, FaHashtag, FaCog } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { RiNotification2Line } from 'react-icons/ri';

import './SecondaryNav.css';

export default function SecondaryNav() {
    return (
        <div className="secondary-nav">
            <div className="secondary-nav-container">
                <div><Link to="/post"><BsPlusCircleFill /> <span>Post</span></Link></div>
                <div><Link to="/following"><FaUserFriends /> <span>Following</span></Link></div>
                <div><Link to="/stats"><GoGraph /> <span>Stats</span></Link></div>
                <div><Link to="/trends"><FaHashtag /> <span>Trends</span></Link></div>
                <div><Link to="/settings"><FaCog /> <span>Settings</span></Link></div>
                <div><Link to="/groups"><BsFillPeopleFill /> <span>Groups</span></Link></div>
                <div><Link to="/notifications"><RiNotification2Line /> <span>Notifications</span></Link></div>
            </div>
        </div>
    );
}
