import React, { useEffect, useState } from 'react'

import NewEntryForm from '../Components/NewEntryForm'
import Entries from '../Components/Entries'
import SecondaryNav from '../Components/SecondaryNav'
import axios from 'axios'
import { useAuth } from '../providers/UserProvider'

export default function PostsPage(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'http://localhost:5000' : 'http://ediary1api.herokuapp.com'

    const [entries, setEntries] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        axios.get(`${url}/uposts/${user.uid}`)
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
                <NewEntryForm setEntries={handleSetEntries} />
                <hr />
                <Entries entries={ entries } />
            </div>
        </>
    )
}
