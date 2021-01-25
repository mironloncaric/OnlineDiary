import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Suggestions.css';
import { useAuth } from '../providers/UserProvider';
import { Form, Button } from 'react-bootstrap';
import FollowItem from './FollowItem';

export default function Suggestions() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000' ;

    const { user, following } = useAuth();
    const [friends, setFriends] = useState([]);

    const searchSuggestions = (word) => {
        axios.post(`${url}/friends-of-friends/${user.uid}`, {
            uid: user.uid,
            keyword: word
        })
            .then(res => setFriends(res.data))
    }

    useEffect(() => {
        searchSuggestions('')
    }, [])

    return (
        <div className="following-div">
            <p>{ user.uid }</p>
            <h3 style={{width:'50%'}}>Friends of Friends</h3>
            <Form.Control onChange={e => {
                searchSuggestions(e.target.value)
            }} style={{width:'50%'}} type="text" placeholder="Search friends" />
            <div className="suggestion-container">
                {
                    friends.map((friend, id) => (
                        <FollowItem key={id} friend={friend} />
                    ))
                }
            </div>
        </div>
    )
}
