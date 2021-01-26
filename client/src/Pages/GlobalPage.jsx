import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuth } from '../providers/UserProvider.jsx';
import FollowItem from '../Components/FollowItem';

export default function GlobalPage() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const { user } = useAuth();

    useEffect(() => {
	console.log('This is the user:', user)
    }, [user])

    const [users, setUsers] = useState(null);

    useEffect(() => {
	axios.post(`${url}/get-all-people`, {
	    id:user.uid
	})
	     .then(res => {
		 setUsers(res.data)
		 console.log('Users:', res)
	    })
    }, [])

    return (
	<div className="page-container">
	    <h3>Global:</h3>
	    {
		users && users.map(user => (
		    <FollowItem friend={user} />
		))
	    }
	</div>
    );
}
