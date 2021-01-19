import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { useAuth } from '../providers/UserProvider'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'

import './MainNavigation.css'

export default function MainNavigation(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const history = useHistory()
    const { user } = useAuth()

    const signInWithEmailAndPasswordHandler = (e) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(err => console.error(err))
        .then(res => history.push('/post'))
        
    }

    return (
        <div>
            <Navbar variant="dark" bg="dark" expand="lg">
  <Navbar.Brand href="#home">Online Diary</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
    {
        !user ?
        <Form inline>
            <FormControl type="email" placeholder="Email" className="mr-sm-2" onChange={
                e => setEmail(e.target.value)
            } />
            <FormControl type="password" placeholder="Password" className="mr-sm-2" onChange={
                e => setPassword(e.target.value)
            } />
            <Button variant="info" onClick={signInWithEmailAndPasswordHandler}>Sign in</Button>
        </Form> 
        :
        <Button variant="info" onClick={e => {
            firebase.auth().signOut()
        }}>Log out</Button>
    }
  </Navbar.Collapse>
</Navbar>
        </div>
    )
}
