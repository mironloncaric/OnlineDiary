import React from 'react'

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function FollowItem(props) {
    return (
        <div>
            <div className="follow-item">
                <span><Link to={`/profile/${props.friend.uid}`}>{ props.friend.uname }</Link></span>
                <Button variant="info">Follow</Button>
            </div>
        </div>
    )
}
