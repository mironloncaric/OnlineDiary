import axios from 'axios'
import React, { useEffect, useState } from 'react'

import './Suggestions.css'
import { useAuth } from '../providers/UserProvider'
import { Form, Button } from 'react-bootstrap'
import FollowItem from './FollowItem'

export default function Suggestions() {

    const url = (process.env.NODE_ENV === 'production') ? 'http://localhost:5000' : 'http://ediary1api.herokuapp.com'

    const { user } = useAuth()
    const [friends, setFriends] = useState([])

    const searchSuggestions = (word) => {
        axios.post(`${url}/friends-sugestions`, {
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
