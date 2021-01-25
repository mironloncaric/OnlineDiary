import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function AddPeople() {
    return (
        <div>
            <div className="row">
                <div className="col">
		    <Form.Control as="input" type="text" placeholder="Search people" />
		</div>
                <div className="col">
                    <Button variant="info">Submit</Button>
		</div>
	    </div>
	</div>
    );
}

