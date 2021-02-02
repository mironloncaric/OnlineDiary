import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './AddPersonItem.css';

export default function Name(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

    const [status, setStatus] = useState(0);

    const handleInvitePerson = () => {
        axios.post(`${url}/new-notification`, {
            uid:props.user.uid,
            uname:props.uname,
            recieverId:props.person.uid,
            body:`Therapy group invite from ${props.uname}: ${props.group.description}`,
            type:'group-invite',
            groupId:props.group._id
        }).then(res => {
            console.log('Notification:', res.data);
        });
        setStatus(1);
    };

    const handleKickPerson = () => {
        axios.delete(`${url}/delete-group-member/${props.person.uid}`)
             .then(res => {
                 console.log(res.data)
             })
    }

    useEffect(() => {
        axios.post(`${url}/invite-status`, {
            uid:props.user.uid,
            recieverId:props.person.uid,
            body:`Therapy group invite from ${props.uname}: ${props.group.description}`,
            type:'group-invite',
            groupId:props.group._id
        }).then(res => {
            if(res.data==='Invited') setStatus(1)
            if(res.data==='Member') setStatus(2);
        });
    }, []);

    return (
        <div className="add-person-item-container">
          <div>{props.person.uname}</div>
          {
            status===0 &&
            <Button size="sm" onClick={handleInvitePerson} variant="info">Invite</Button>
          }
          {
            status===1 &&
            <Button size="sm" onClick={handleInvitePerson} variant="info" disabled>Invited</Button>
          }
          {
            status===2 &&
            <Button size="sm" onClick={handleKickPerson} variant="outline-info">Kick</Button>
          }
        </div>
    );
}
