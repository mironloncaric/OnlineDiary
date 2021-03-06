import React from 'react';
import CommentEntry from './CommentEntry';
import Comments from './Comments';
import Entry from './Entry';

export default function Comment(props) {

    React.useEffect(() => {
        console.log("These props: ", props)
    }, [])


    return (
        <div>
            <CommentEntry
                content={props.content}
                uid={props.uid}
                uname={props.uname}
                date={props.date}
                comment={true}
                pid={props.id}
            />
        </div>
    );
}
