import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useAuth } from '../providers/UserProvider.jsx';

export default function AddPeople() {

    const [people, setPeople] = useState(null);
    
    const { country } = useAuth();
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

    useEffect(() => {
        getPeople('');
    }, [])

    const getPeople = keyword => {
        console.log(country)
        axios.post(`${url}/get-people-by-country`, {
            country:country,
            keyword:keyword
        }).then(res => {
            setPeople(res.data);
        });
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Form.Control as="input" type="text" placeholder="Search people" />
                </div>
                <div className="col">
                    <Button variant="info">Submit</Button>
                </div>
            </div>
            <div>
                {
                    people && people.map(person => {
                        <div>
                            {person.uname}
                            <Button variant="info">Add</Button>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

