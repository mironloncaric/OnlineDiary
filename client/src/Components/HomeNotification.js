import React from 'react'
import './HomeNotification.css'

export default function HomeNotification() {
    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
	    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
	    <p>
              <b>New Notification: </b>
              hello world
              { props.body }
	    </p>
	</Alert>
    )
}
