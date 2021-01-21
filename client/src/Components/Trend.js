import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

import './Trend.css'

export default function Trend(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'
    const [emojis, setEmojis] = useState([
        {emoji:'😃', n:0},
        {emoji:'😍', n:0},
        {emoji:'😢', n:0},
        {emoji:'🤮', n:0},
        {emoji:'😎', n:0}
    ])

    const handleFetchData = () => {
        axios.post(`${url}/trend-info/`, {
            value: props.value
        })
        .then(res => {
            setEmojis(res.data)
        })
    }

    useEffect(() => {
        handleFetchData()
    }, [])

    useEffect(() => {
    }, [emojis])

    return (
        <div className="trend-item">
            <div className="trend-item-name">
                <span>{props.value}</span>
            </div>
            <div className="trend-item-emojis-stats">
                <div>
                    <span>{emojis[0].emoji}</span>
                    <span>{emojis[0].n}</span>
                </div>
                <div>
                    <span>{emojis[1].emoji}</span>
                    <span>{emojis[1].n}</span>
                </div>
                <div>
                    <span>{emojis[2].emoji}</span>
                    <span>{emojis[2].n}</span>
                </div>
                <div>
                    <span>{emojis[3].emoji}</span>
                    <span>{emojis[3].n}</span>
                </div>
                <div>
                    <span>{emojis[4].emoji}</span>
                    <span>{emojis[4].n}</span>
                </div>
            </div>
        </div>
    )
}
