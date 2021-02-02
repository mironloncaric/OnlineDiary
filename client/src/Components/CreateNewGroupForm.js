import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import './CreateNewGroupForm.css';

import { useAuth } from '../providers/UserProvider.jsx';

export default function CreateNewGroupForm() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

    const { user, uname } = useAuth();
    const history = useHistory();

    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const createNewGroup = () => {
        axios.post(`${url}/new-group`, {
            creatorId:user.uid,
            creatorUname:uname,
            name:name,
            description:description
        }).then(res => {
            history.push(`/group/${res.data._id}`)
        });
    };

    return (
        <div style={{
            marginBottom:'20px'
        }}>
            <h3>Create a New Group</h3>
            <Form.Control value={name} onChange={e => setName(e.target.value)} as="input" type="text" placeholder="Group Name" />
            <Form.Control style={{
                marginBottom:'5px'
            }} value={description} onChange={e => setDescription(e.target.value) } as="textarea" placeholder="Group Description" />
            <Button onClick={ createNewGroup } variant="info">Submit</Button>
        </div>
    );
}
