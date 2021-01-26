import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap'

import { useAuth } from '../providers/UserProvider.jsx';
import AddPeople from '../Components/AddPeople.jsx';
import AddPersonItem from '../Components/AddPersonItem';

export default function GroupItemPage() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const params = useParams();
    const { country } = useAuth();

    const [group, setGroup] = useState(null);
    const [people, setPeople] = useState(null);

    useEffect(() => {
        axios.get(`${url}/group-by-id/${params.id}`)
        .then(res => {
            setGroup(res.data);
        });
    }, []);

    if(group)
	return (
		<div className="page-container">
		    <h3>{group.name}</h3>
		    <AddPeople group={group} />
		</div>
	)
    else {
	return (

	    <div className="page-conatiner">
		<h3>Can't find that group...</h3>
	    </div>
    )}
}
