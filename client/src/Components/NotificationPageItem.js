import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { useAuth } from '../providers/UserProvider.jsx';
import './NotificationPageItem.css';

export default function NotificationPageItem(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const { user, uname } = useAuth();

    useEffect(() => {
	console.log(props.notification)
    }, [])

    const joinGroup = () => {
	axios.post(`${url}/group-member`, {
	    uid:user.uid,
	    uname:uname,
	    groupId:props.notification.groupId
	})
	axios.delete(`${url}/notification/${props.notification._id}`)
	     .then(res => {
		 props.removeItem()
	});
    };

    return (
	<div className="notification-page-item">
	    <div className="notification-page-item-header">
		{props.notification.uname || 'Username'}
	    </div>
	    <div className="notification-page-item-body">
		<div>{props.notification.body}</div>
		{
		    props.notification.type === 'group-invite' &&
		    <Button onClick={joinGroup} variant="info" size="sm">Join</Button>
		}
	    </div>
	</div>
    );
}
