import axios from 'axios'
import React from 'react'

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../providers/UserProvider'
import './FollowItem.css'

export default function FollowItem(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'
    const { user } = useAuth()
    const [following, setFollowing] = React.useState(0)

    const handleFollow = () => {
        axios.post(`${url}/follow`, {
            uid:user.uid,
            followingId:props.friend.uid
        }).then(() => {
            setFollowing(1)
        })
    }

    return (
        <div>
            <div className="follow-item">
                <div><Link to={`/profile/${props.friend.uid}`}>{ props.friend.uname }</Link></div>
                {
                    !following ?
                        <Button onClick={handleFollow} variant="info">Follow</Button>
                        :
                        <Button variant="info">Unfollow</Button>
                }

            </div>
        </div>
    )
}
