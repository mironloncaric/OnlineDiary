import React, { useState } from 'react'

import Entries from '../Components/Entries'
import SecondaryNav from '../Components/SecondaryNav'
import Suggestions from '../Components/Suggestions'

export default function FollowingPage() {

    const [entries, setEntries] = useState([])

    return (
        <>
            <SecondaryNav />
            <div className="page-container">
                <Suggestions />
                <Entries entries={ entries } />
            </div>
        </>
    )
}
