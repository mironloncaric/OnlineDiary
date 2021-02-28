import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useAuth } from '../providers/UserProvider'
import FrequencyGraph from '../Components/FrequencyGraph.jsx'
import TimeProgressionChart from '../Components/TimeProgressionChart'
import SecondaryNav from '../Components/SecondaryNav'

export default function StatsPage() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'
    const { user } = useAuth()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${url}/uposts/${user.uid}`)
             .then(res => {
                 setPosts(res.data)
             })
    }, [])

    return (
        <>
          <SecondaryNav />
          <div className="page-container">
            <h2>Stats:</h2>
            <FrequencyGraph posts={posts} />
            <TimeProgressionChart posts={posts} />
          </div>
        </>
    )
}
