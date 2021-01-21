import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const userContext = createContext()

export function useAuth() {
    return useContext(userContext)
}

export default function UserProvider({ children }) {

    const [user, setUser] = useState(null)
    const [uname, setUname] = useState(null)
    const [followers, setFollowers] = useState(null)
    const [notifications, setNotifications] = useState(null)
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
            if(user) {
                axios.get(`${url}/uname/${user.uid}`)
                .then(res => {
                    setUname(res.data.uname)
                })
                axios.get(`${url}/followers/${user.uid}`)
                .then(res => {
                    console.log('set followers')
                    setFollowers(res.data)
                })
            }
        })
    }, [])

    const handleSetUname = username => {
        setUname(username)
    }

    const value = {
        user,
        uname,
        handleSetUname,
        followers
    }

    return (
        <userContext.Provider value={ value }>
            { children }
        </userContext.Provider>
    )
}