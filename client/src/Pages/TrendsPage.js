import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SecondaryNav from '../Components/SecondaryNav'
import Trends from '../Components/Trends'
import { useAuth } from '../providers/UserProvider'

export default function TrendsPage() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'
    const { user } = useAuth()

    const [userTrends, setUserTrends] = useState(null)

    const handleUserTrends = () => {
        axios.get(`${url}/trends-by-id/${user.uid}`)
            .then(res => {
                console.log(res.data)
                setUserTrends(res.data)
            })
    }

    useEffect(() => {
        handleUserTrends()
    }, [])

    return (
        <>
            <SecondaryNav />
            <div className="page-container">
                <h2>Trends:</h2>
                <h3>Your trends:</h3>
                <Trends trends={userTrends} />
            </div>
        </>
    )
}
