import React from 'react'
import { HiOutlineX } from 'react-icons/hi'
import { useAuth } from '../providers/UserProvider'

import './Entry.css'

export default function Entry(props) {

    const { user } = useAuth()

    var color = ""
    if(props.emoji === '😃') color = "yellow"
    if(props.emoji === '😍') color = "red"
    if(props.emoji === '😢') color = "blue"
    if(props.emoji === '🤮') color = "green"
    if(props.emoji === '😎') color = "gray"

    return (
        <div className="entry-container">
            <div className={`${color} entry-header`}>
                <div style={{
                    width:'auto',
                    display:'inline-block'
                }}>
                    <b>Dear Diary,</b>
                </div>
                <div style={{
                    width:'auto',
                    display:'inline-block',
                    float:'right'
                }}>
                    <span className="date">{ props.date }</span>
                    <span className="emoji-entry">{ props.emoji }</span>
                    { (user.uid===props.uid) &&
                        <button className="x"><HiOutlineX /></button>
                    }
                </div>
            </div>
            <p className="entry-content">{ props.content }</p>
        </div>
    )
}
