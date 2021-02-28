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

    const [userTrends, setUserTrends] = useState([])
    const [popularTrends, setPopularTrends] = useState([])

    const handleUserTrends = () => {
        axios.get(`${url}/trends-by-id/${user.uid}`)
            .then(res => {
                setUserTrends(res.data)
            })
    }

    const handlePopularTrends = () => {
        axios.post(`${url}/popular-trends`, {})
             .then(res => {
                 setPopularTrends(res.data)
             })
    }

    useEffect(() => {
        handleUserTrends()
        handlePopularTrends()
    }, [])

    return (
        <>
            <SecondaryNav />
            <div className="page-container">
                <h2>Trends:</h2>
                <h3>Your Trends:</h3>
                <Trends trends={userTrends} />
              <h3>Popular Trends:</h3>
              <Trends trends={popularTrends} />
            </div>
        </>
    )
}
