import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../providers/UserProvider';
import Axios from 'axios';
import socketio from 'socket.io-client';

import './NewEntryForm.css';
const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
const socket = socketio.connect(url);

export default function NewEntryForm(props) {

    const [emoji, setEmoji] = useState("😃");
    const [content, setContent] = useState();
    const [hashtags, setHashtags] = useState('');
    const [location, setLocation] = useState({});
    const [country, setCountry] = useState(null);
    const [username, setUsername] = useState('');
    const [spotifyURI, setSpotifyUri] = useState('')

    const { user, uname, followers } = useAuth();

    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            }, err => {
                console.log('No location');
            }, { maximumAge:10000, timeout:5000, enableHighAccuracy:true } );
        }
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                setCountry(response.country);
            });
    }, []);

    const handlePost = e => {
        let hashs = null;
        if(hashtags.trim().length > 0)
            hashs = hashtags.split(" ");
        if(hashs)
            hashs.forEach(hash => {
                Axios.post(`${url}/hashtag`, {
                    value: hash,
                    country: country,
                    uid: user.uid,
                    group: props.group,
                    uname: uname,
                    emoji: emoji
                });
            });
        e.preventDefault();
        Axios.post(`${url}/post`, {
            uid: user.uid,
            emoji: emoji,
            location: location,
            hashtags: hashtags,
            uname: uname,
            group:props.group,
            postBody: content,
            spotifyURI: spotifyURI,
        }).then(res => {
	    props.setEntries(res.data);
            followers.forEach(follower => {
                socket.emit(`notification`, {
                    notification:'New post',
                    uid:follower.uid
                });
		Axios.post(`${url}/new-notification`, {
		    creatorId:user.uid,
		    uname: uname,
		    recieverId:follower.uid,
		    body:`${uname} Created a New Post Entry`,
		    type:`New post`,
		    groupId:null
		});
            });
        });
        setHashtags('');
        setContent('');
    };

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
                as="input"
                style={{
                    margin:0
                }}
                rows={ 1 }
                onChange={ e => setSpotifyUri(e.target.value) }
                value={ spotifyURI }
                placeholder="Spotify link"
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
