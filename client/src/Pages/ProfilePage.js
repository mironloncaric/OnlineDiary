import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import Entries from '../Components/Entries'

export default function ProfilePage(props) {

    const [entries, setEntries] = useState([])
    const [uname, setUname] = useState()
    
    const params = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/uposts/${params.uid}`)
            .then(res => {
                console.log(res.data)
                setEntries(res.data)
            })
            .catch(err => console.log(err))
        axios.get(`http://localhost:5000/uname/${params.uid}`)
            .then(res => {
                setUname(res.data.uname)
            })
    }, [])

    return (
        <div className="page-container">
            <h2>{ uname }</h2>
            <hr />
            <Entries entries={entries} />
        </div>
    )
}
