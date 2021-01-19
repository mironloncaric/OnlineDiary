import React from 'react'

import './Entries.css'
import Entry from './Entry'

export default function Entries({ entries }) {
    return (
        <div>
            { (entries.length>0) && 
                entries.map(({ postBody, emoji, date, uid }, id) => (
                    <Entry
                        key={ id }
                        date={ date }
                        content={ postBody }
                        emoji={ emoji }
                        uid={ uid }
                    />
                ))
            }
        </div>
    )
}
