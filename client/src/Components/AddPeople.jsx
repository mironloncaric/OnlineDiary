import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AddPersonItem from './AddPersonItem';
import './AddPeople.css';

import { useAuth } from '../providers/UserProvider.jsx';

export default function AddPeople(props) {

    const [people, setPeople] = useState(null);
    
    const { country, user, uname } = useAuth();
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

    useEffect(() => {
        getPeople('');
    }, []);

    const getPeople = keyword => {
        console.log(country);
        axios.post(`${url}/get-people-by-country`, {
	    id:user.uid,
            country:country,
            keyword:keyword
        }).then(res => {
            setPeople(res.data);
        });
    };

    return (
        <div>
          <br/>
            <Form.Control onChange={e => {
                getPeople(e.target.value);
            }} style={{
                width:'50%'
            }} as="input" type="text" placeholder="Search people" />
            <div>
                {
                    people && people.map((person, key) => (
                        <AddPersonItem
                            key={key}
                            user={user}
                            person={person}
                            uname={uname}
                            group={props.group}
                        />
                    ))
                }
            </div>
          <br/>
        </div>
    );
}

