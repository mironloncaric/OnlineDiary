import React, { useEffect, useState } from 'react'

import NewEntryForm from '../Components/NewEntryForm'
import Entries from '../Components/Entries'
import SecondaryNav from '../Components/SecondaryNav'
import axios from 'axios'
import { useAuth } from '../providers/UserProvider'

export default function PostsPage(props) {

    const [entries, setEntries] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        axios.get(`http://localhost:5000/uposts/${user.uid}`)
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
