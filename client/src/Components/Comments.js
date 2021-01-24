import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Comment from './Comment';

export default function Comments(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const [comments, setComments] = React.useState([]);
    const [slice, setSlice] = React.useState(1);
    const [showLoad, setShowLoad] = React.useState();

    useEffect(() => {
        axios.get(`${url}/comment/${props.id}`)
        .then(res => {
            setComments(res.data);
        });
    }, [props.rerender]);

    useEffect(() => {
	if(comments.length > 1)
	    setShowLoad(1);
    }, [comments]);
    useEffect(() => {
	if(comments.length > 1)
	    setShowLoad(1);
    }, [comments]);

    return (
        <div style={{
            marginLeft:'5%'
        }}>
            {
                comments &&
                (slice === 0 ?
                comments.map((comment, key) => (
                    <Comment 
                        key={key}
                        content={comment.content}
                        uname={comment.uname}
                        date={comment.date}
                        uid={comment.uid}
                        id={comment._id}
                    />
                ))
                :
                comments.slice(0, 1).map((comment, key) => (
                    <Comment 
                        key={key}
                        content={comment.content}
                        uname={comment.uname}
                        date={comment.date}
                        uid={comment.uid}
                        id={comment._id}
                    />
                )))

            }
            {
                showLoad &&
                <div style={{
                        width:'100%',
                        margin:'0 auto',
                        textAlign:'center'
                    }}>
                    <Button variant="info" href="#" onClick={e => {
                        e.preventDefault();
                        setSlice(0);
                    }} style={{
                        marginBottom:'20px',
                        width:'100%'
                    }}>Load more</Button>
                </div>
            }
	</div>
    );
}
