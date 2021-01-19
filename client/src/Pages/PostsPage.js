import React, { useEffect, useState } from 'react'

import NewEntryForm from '../Components/NewEntryForm'
import Entries from '../Components/Entries'
import SecondaryNav from '../Components/SecondaryNav'
import axios from 'axios'
import { useAuth } from '../providers/UserProvider'

export default function PostsPage(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'

    const [entries, setEntries] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        axios.get(`http/uposts/${user.uid}`)
            .then(res => {
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
