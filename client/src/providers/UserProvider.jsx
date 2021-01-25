import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'

const userContext = createContext()

export function useAuth() {
    return useContext(userContext)
}

export default function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [uname, setUname] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isTherapist, setIsTherapist] = useState(false);
    const [country, setCountry] = useState(null)
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
            if(user) {
                axios.get(`${url}/uname/${user.uid}`)
                .then(res => {
                    setUname(res.data.uname);
                    setIsTherapist(res.data.isTherapist);
                    setCountry(res.data.country)
                })
                axios.get(`${url}/followers/${user.uid}`)
                .then(res => {
                    console.log('set followers')
                    setFollowers(res.data)
                })
                axios.get(`${url}/following/${user.uid}`)
                .then(res => {
                    console.log('set following')
                    setFollowing(res.data)
                })
            }
        })
    }, [])

    useEffect(() => {
        console.log(notifications)
    }, [notifications])

    const handleSetUname = username => {
        setUname(username)
    }
    const handleSetNotifications = notification => {
	if(notification.length>0)
	    setNotifications(notifications => [...notifications, notification])
    }

    const value = {
        user,
        uname,
        handleSetUname,
        followers,
        following,
        handleSetNotifications,
        notifications,
        country,
        isTherapist
    }

    return (
        <userContext.Provider value={ value }>
            { children }
        </userContext.Provider>
    )
}
