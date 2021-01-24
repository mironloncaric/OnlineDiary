import React, { useState } from 'react';
import './Notification.css';
import { Toast } from 'react-bootstrap';

export default function Notification(props) {

    const [show, setShow] = useState(true);

    return (
	show &&
	    <Toast onClose={() => setShow(false)}>
		<Toast.Header>
		    <strong className="mr-auto">Bootstrap</strong>
		    <small>just now</small>
		</Toast.Header>
		<Toast.Body>See? Just like this.</Toast.Body>
	    </Toast>
    );
}
