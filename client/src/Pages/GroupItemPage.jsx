import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom'

import AddPeople from '../Components/AddPeople.jsx';

export default function GroupItemPage() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const params = useParams();

    const [group, setGroup] = useState(null);

    useEffect(() => {
        axios.get(`${url}/group-by-id/${params.id}`)
        .then(res => {
            setGroup(res.data[0]);
        });
    }, []);

    useEffect(() => {
        console.log(group);
    }, [group])

    if(group) {
        return (
            <div className="page-container">
                <h3>{group.name}</h3>
                <AddPeople />
            </div>
        );
    } else {
        return (
            <div className="page-conatiner">
                <h3>Can't find that group...</h3>
            </div>
        )
    }
}
