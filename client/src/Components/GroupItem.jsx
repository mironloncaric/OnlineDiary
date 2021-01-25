import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function GroupItem(props) {

    const history = useHistory();

    return (
        <div>
            <span>{props.group.name}</span>
            <Button variant="info" onClick={() => {
                history.push(`/group/${props.group._id}`);
            }}>Go to group</Button>
        </div>
    );
}
