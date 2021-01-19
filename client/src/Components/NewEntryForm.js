import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAuth } from '../providers/UserProvider'
import Axios from 'axios'

import './NewEntryForm.css'

export default function NewEntryForm(props) {

    const [emoji, setEmoji] = useState("😃")
    const [content, setContent] = useState()
    const [location, setLocation] = useState({})

    const { user } = useAuth()

    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            }, err => {
                alert('Please enable geolocation')
            }, { maximumAge:10000, timeout:5000, enableHighAccuracy:true } )
        }
    }, [])

    const handlePost = e => {
        e.preventDefault()
        Axios.post('http://localhost:5000/post', {
            uid: user.uid,
            emoji: emoji,
            location: location,
            postBody: content
        }).then(res => {
            props.setEntries(res.data)
        })
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
