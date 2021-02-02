import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './GroupItem.css';

export default function GroupItem(props) {

    const history = useHistory();

    return (
        <div className="group-item">
            <div>{props.group.name}</div>
            <Button size="sm" variant="dark" onClick={() => {
                history.push(`/group/${props.group._id}`);
            }}>Go to group</Button>
        </div>
    );
}
