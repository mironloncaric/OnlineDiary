import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function Name(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

    const [isIn, setIsIn] = useState(null);

    useEffect(() => {
	
    }, []);

    const handleInvitePerson = () => {
	axios.post(`${url}/new-notification`, {
	    uid:props.user.uid,
	    uname:props.uname,
	    recieverId:props.person.uid,
	    body:`Therapy group invite from ${props.uname}`,
	    type:'group-invite',
	    groupId:props.group._id
	}).then(res => {
	    console.log('Notification:', res.data);
	});
    };

    return (
	<div>
            <span>{props.person.uname}</span>
	    <Button onClick={handleInvitePerson} variant="info">Invite</Button>
	</div>
    );
}
