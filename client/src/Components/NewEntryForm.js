import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAuth } from '../providers/UserProvider'
import Axios from 'axios'
import socketio from 'socket.io-client'

import './NewEntryForm.css'
const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'
const socket = socketio.connect(url)

export default function NewEntryForm(props) {

    const [emoji, setEmoji] = useState("😃")
    const [content, setContent] = useState()
    const [hashtags, setHashtags] = useState('')
    const [location, setLocation] = useState({})
    const [country, setCountry] = useState(null)


    const { user, uname, followers } = useAuth()

    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            }, err => {
                console.log('No location')
            }, { maximumAge:10000, timeout:5000, enableHighAccuracy:true } )
        }
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                setCountry(response.country)
            })

            return socket.removeAllListeners()
    }, [])

    const handlePost = e => {
        let hashs = null
        if(hashtags.trim().length > 0)
            hashs = hashtags.split(" ")
        console.log(hashs)
        if(hashs)
            hashs.forEach(hash => {
                Axios.post(`${url}/hashtag`, {
                    value: hash,
                    country: country,
                    uid: user.uid,
                    uname: uname,
                    emoji: emoji
                })
            })
        e.preventDefault()
        Axios.post(`${url}/post`, {
            uid: user.uid,
            emoji: emoji,
            location: location,
            hashtags: hashtags,
            uname: uname,
            postBody: content
        }).then(res => {
            props.setEntries(res.data)
            followers.forEach(follower => {
                console.log('follower')
                socket.emit(`notification`, {
                    notification:'New post',
                    uid:follower.uid
                })
            })
        })
        setHashtags('')
        setContent('')
    }

    return (
        <div>
            <div className="header">
                <div className="form-control header-gray">
                    Dear Diary,
                </div>
                <select 
                    className="form-control emoji"
                    onChange={ e => setEmoji(e.target.value) }
                    value={ emoji }
                >
                    <option>😃</option>
                    <option>😍</option>
                    <option>😢</option>
                    <option>🤮</option>
                    <option>😎</option>
                </select>
            </div>
            <Form.Control 
                as="textarea" 
                rows={ 5 }
                onChange={ e => setContent(e.target.value) }
                value={ content }
            />
            <Form.Control 
                as="textarea" 
                rows={ 1 }
                onChange={ e => setHashtags(e.target.value) }
                value={ hashtags }
                placeholder="#hashtags..."
            />
            <Button 
                variant="info"
                style={{
                    marginTop:10
                }}
                onClick={handlePost}
            >Submit</Button>
        </div>
    )
}
