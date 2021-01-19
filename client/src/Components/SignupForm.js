import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

export default function SignupForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')

    const history = useHistory()

    const createUser = (e) => {
        if(password !== '' && email !== '' && confirmPassword !== '' && username !== '' && password === confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                Axios.post('http://localhost:5000/username', {
                    uid:res.user.uid,
                    uname:username
                }).then(res => {
                    if(res.error) {
                        console.log(res.error)
                    } else {
                        history.push('/post')
                    }
                })
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Form.Control type="email" placeholder="Email" onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }
                    } />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Form.Control type="text" placeholder="Username" onChange={
                        (e) => {
                            setUsername(e.target.value)
                        }
                    } />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Form.Control onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    } type="password" placeholder="Password" />
                </div>
                <div className="col">
                    <Form.Control onChange={
                        (e) => {
                            setConfirmPassword(e.target.value)
                        }
                    } type="password" placeholder="Confirm Password" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Button onClick={ createUser } variant="info">Submit</Button>
                </div>
            </div>
        </div>
    )
}
