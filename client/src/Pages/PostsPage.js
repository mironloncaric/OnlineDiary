import React, { useEffect, useState } from 'react'

import NewEntryForm from '../Components/NewEntryForm'
import Entries from '../Components/Entries'
import SecondaryNav from '../Components/SecondaryNav'
import axios from 'axios'
import { useAuth } from '../providers/UserProvider'
import socketio from 'socket.io-client'
const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'

export default function PostsPage(props) {

    const [entries, setEntries] = useState([])

    const { user, notifications, handleSetNotifications } = useAuth()

    useEffect(() => {
        axios.get(`${url}/uposts/${user.uid}`)
            .then(res => {
                if(!res.error)
                    setEntries(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSetEntries = (newEntries) => {
        setEntries(newEntries)
    }

    return (
        <>
            <SecondaryNav />
            {
                notifications.map(notif => {
                    return <p>{notif}</p>
                })
            }
            <div className="page-container">
                {
                    (process.env.NODE_ENV === 'production') &&
                    <p>Great, success!</p>
                }
                <NewEntryForm setEntries={handleSetEntries} />
                <hr />
                <Entries entries={ entries } />
            </div>
        </>
    )
}
