import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Entries from '../Components/Entries'
import SecondaryNav from '../Components/SecondaryNav'
import Suggestions from '../Components/Suggestions'

export default function FollowingPage() {

    const [entries, setEntries] = useState([])
    const [location, setLocation] = useState(null)
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000' 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords)
            setLocation(position.coords)
            axios.get(`${url}/uposts-by-location/${position.coords.latitude}/${position.coords.longitude}`)
                .then(res => {
                    setEntries(res.data)
                })
                .catch(err => console.log(err))
        })
    }, [])

    return (
        <>
            <SecondaryNav />
            <div className="page-container">
                <Suggestions />
                {
                    (entries.length>0) ?
                    <Entries entries={ entries } />
                    :
                    !location ?
                        <h4 className="no-posts">Please turn on location to view other's posts</h4>
                        :
                        <h4 className="no-posts">No posts to show...</h4>
                }
            </div>
        </>
    )
}
