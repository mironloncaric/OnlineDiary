import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { HiOutlineX } from 'react-icons/hi';
import { BiComment, BiRepost } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { AiOutlineMessage } from 'react-icons/ai';
import { useAuth } from '../providers/UserProvider';

import './Entry.css';
import axios from 'axios';
import Comments from './Comments';

export default function Entry(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

    const [comment, setComment] = useState();
    const [emoji, setEmoji] = useState();
    const [showComment, setShowComment] = useState(0);
    const [showEmoji, setShowEmoji] = useState(0);
    const [rerender, setRerender] = useState();
    const [likes, setLikes] = useState([0, 0, 0, 0, 0]);
    const [currentLike, setCurrentLike] = useState()

    const { user, uname } = useAuth();

    useEffect(() => {
        setRerender(rerender+1);
        getLikes();
        handleCurrentLike();
    }, [props.rerender]);

    const handleComment = e => {
        e.preventDefault();
        axios.post(`${url}/comment`, {
            uid:user.uid,
            uname: uname,
            post_id:props.id,
            content:comment
        }).then((res) => {
            setRerender(res);
            setComment('');
            setShowComment(0);
        });
    };

    const handleCurrentLike = () => {
        axios.get(`${url}/current-like/${props.id}/${user.uid}`)
             .then(res => setCurrentLike(res.data));
    }

    const getLikes = () => {
        axios.get(`${url}/likes/${props.id}/${user.uid}`)
             .then(res => setLikes(res.data))
             .catch(err => console.log(err));
    }

    const handleLike = (emoji) => {
        axios.post(`${url}/like`, {
            creatorUid: user.uid,
            userId: props.uid,
            pid: props.id,
            emoji: emoji
        })
             .catch(err => console.log(err));
        handleCurrentLike();
    }

    var color = "";
    if(props.emoji === '😃') color = "yellow";
    if(props.emoji === '😍') color = "red";
    if(props.emoji === '😢') color = "blue";
    if(props.emoji === '🤮') color = "green";
    if(props.emoji === '😎') color = "gray";

    return (
        <>
            <div className="entry-container">
                <div className="header-gray header form-control uname-entry">{ props.uname }</div>
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
                        <span className="emoji-entry">{ props.emoji }</span>
                        { (user.uid===props.uid) &&
                            <button className="x"><HiOutlineX /></button>
                        }
                    </div>
                </div>
                <p className="entry-content">{ props.content }</p>
              {
                  props.spotifyURI &&
                    <iframe style={{
                        width:"100%",
                        margin:0,
                        height:86.5
                    }} src={props.spotifyURI} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              }
                <div style={{
                    borderTop:'1px solid lightgray'
                }} className={`${color} entry-header`}>
                    {
                        props.hashtags &&
                        <div>
                            { props.hashtags }
                        </div>
                    }
                    <div className="spans">
                        <span><button
                            onClick={() => {
                                if(showComment===1) {
                                    setShowComment(0);
                                }
                                if(showComment===0) {
                                    setShowEmoji(0);
                                    setShowComment(1);
                                }
                            }}
                        ><BiComment /></button></span>
                        <span><button
                            onClick={() => {
                                if(showEmoji===1) {
                                    setShowEmoji(0);
                                }
                                if(showEmoji===0) {
                                    setShowComment(0);
                                    setShowEmoji(1);
                                }
                            }}
                        ><HiOutlineEmojiHappy /></button></span>
                        <span><button><AiOutlineMessage /></button></span>
                        <span><button><BiRepost /></button></span>
                      <span>{currentLike}</span>
                    </div>
                </div>
                {
                    showComment === 1 &&
                    <div className="comment-section">
                        <Form.Control value={comment} onChange={e => {
                            setComment(e.target.value)
                        }} as="textarea" rows="1">
                        </Form.Control>
                        <Button onClick={handleComment} variant="info">
                            Post
                        </Button>
                    </div>
                }
                {
                    showEmoji === 1 &&
                    <div className="comment-section">
                        <a href="" onClick={e => {
                            e.preventDefault();
                            handleLike('😃');
                        }}>😃</a><span>{likes[0]} </span>
                        <a href="" onClick={e => {
                            e.preventDefault();
                            handleLike('😍');
                        }}>😍</a><span>{likes[1]} </span>
                        <a href="" onClick={e => {
                            e.preventDefault();
                            handleLike('😢');
                        }}>😢</a><span>{likes[2]} </span>
                        <a href="" onClick={e => {
                            e.preventDefault();
                            handleLike('🤮');
                        }}>🤮</a><span>{likes[3]} </span>
                        <a href="" onClick={e => {
                            e.preventDefault();
                            handleLike('😎');
                        }}>😎</a><span>{likes[4]} </span>
                    </div>
                }
            </div>
            <Comments rerender={rerender} pid={props.id} />
        </>
    )
}
