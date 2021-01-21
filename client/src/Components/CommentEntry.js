import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { HiOutlineX } from 'react-icons/hi'
import { BiComment, BiRepost } from 'react-icons/bi'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import { AiOutlineMessage } from 'react-icons/ai'
import { useAuth } from '../providers/UserProvider'
import Comments from './Comments'

import './Entry.css'
import axios from 'axios'

export default function CommentEntry(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'

    const [comment, setComment] = React.useState()
    const [emoji, setEmoji] = React.useState()
    const [showComment, setShowComment] = React.useState(0)
    const [showEmoji, setShowEmoji] = React.useState(0)
    const [rerender, setRerender] = React.useState()

    const { user, uname } = useAuth()

    const handleComment = () => {
        axios.post(`${url}/comment`, {
            uid:user.uid,
            uname: uname,
            post_id:props.id,
            content:comment
        }).then((res) => {
            console.log(res)
            setRerender(1)
            setComment('')
            setShowComment(0)
        })
    }

    var color = ""
    if(props.emoji === '😃') color = "yellow"
    if(props.emoji === '😍') color = "red"
    if(props.emoji === '😢') color = "blue"
    if(props.emoji === '🤮') color = "green"
    if(props.emoji === '😎') color = "gray"

    return (
        <>
        <div className="entry-container">
            <div className=""></div>
            <div className={`header-gray header form-control uname-entry entry-header`}>
                <div style={{
                    width:'auto',
                    display:'inline-block'
                }}>
                    <b>{ props.uname }</b>
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
            <div style={{
                borderTop:'1px solid lightgray'
            }} className={`header-gray header form-control uname-entry entry-header entry-header`}>
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
                                setShowComment(0)
                            }
                            if(showComment===0) {
                                setShowEmoji(0)
                                setShowComment(1)
                            }
                        }}
                    ><BiComment /></button></span>
                    <span><button
                        onClick={() => {
                            if(showEmoji===1) {
                                setShowEmoji(0)
                            }
                            if(showEmoji===0) {
                                setShowComment(0)
                                setShowEmoji(1)
                            }
                        }}
                    ><HiOutlineEmojiHappy /></button></span>
                    <span><button><AiOutlineMessage /></button></span>
                    <span><button><BiRepost /></button></span>
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
                    <span>😃</span>
                    <span>😍</span>
                    <span>😢</span>
                    <span>🤮</span>
                    <span>😎</span>
                </div>
            }
        </div>
        <Comments rerender={rerender} id={props.id} />
        </>
    )
}
