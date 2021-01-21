import React from 'react'

import SecondaryNav from '../Components/SecondaryNav'
import { useAuth } from '../providers/UserProvider'

export default function SettingsPage() {

    const { uname } = useAuth()

    return (
        <>
            <SecondaryNav />
            <div className="page-container">
                <h2>{ uname }</h2>
            </div>
        </>
    )
}
