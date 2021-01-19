import React from 'react'
import { Link } from 'react-router-dom'
import { BsPlusCircleFill } from 'react-icons/bs'
import { FaUserFriends, FaHashtag, FaCog } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'

import './SecondaryNav.css'

export default function SecondaryNav() {
    return (
        <div className="secondary-nav">
            <div className="secondary-nav-container">
                <Link to="/post"><BsPlusCircleFill /></Link>
                <Link to="/following"><FaUserFriends /></Link>
                <Link to="/stats"><GoGraph /></Link>
                <Link to="/trends"><FaHashtag /></Link>
                <Link to="/settings"><FaCog /></Link>
            </div>
        </div>
    )
}
