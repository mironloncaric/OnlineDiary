import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import Entries from '../Components/Entries'

export default function ProfilePage(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'http://localhost:5000' : 'http://ediary1api.herokuapp.com'

    const [entries, setEntries] = useState([])
    const [uname, setUname] = useState()
    
    const params = useParams()

    useEffect(() => {
        axios.get(`${url}/uposts/${params.uid}`)
            .then(res => {
                console.log(res.data)
                setEntries(res.data)
            })
            .catch(err => console.log(err))
        axios.get(`${url}/uname/${params.uid}`)
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
