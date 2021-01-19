import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const userContext = createContext()

export function useAuth() {
    return useContext(userContext)
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const value = {
        user
    }
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    return (
        <userContext.Provider value={ value }>
            { children }
        </userContext.Provider>
    )
}