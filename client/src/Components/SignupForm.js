import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../providers/UserProvider';
import Axios from 'axios';

export default function SignupForm() {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [unameAvabile, setUnameAvabile] = useState(null);
    const [country, setCountry] = useState(null);

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const { handleSetUname } = useAuth();

    const history = useHistory();

    useEffect(() => {
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                setCountry(response.country);
            });
    })

    const createUser = (e) => {
        e.preventDefault();
        if(country && country !== '') {
            if(password !== '' && email !== '' && confirmPassword !== '' && username !== '' && password === confirmPassword && unameAvabile==='avabile') {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    Axios.post(`${url}/username`, {
                        name:null,
                        surname:null,
                        uid:res.user.uid,
                        country:country,
                        isTherapist:false,
                        uname:username
                    }).then(res => {
                        if(res.data.error) {
                            console.log(res.error);
                        } else {
                            handleSetUname(username);
                            history.push('/post');
                        }
                    });
                })
                .catch(err => {
                    if(err.code === "auth/email-already-in-use") 
                        setEmailError('Email is already in use...');
                    if(err.code === "auth/invalid-email") 
                        setEmailError('The email address is badly formatted...');
                });
            }
        }
    };

    const checkUname = uname => {
        Axios.get(`${url}/check-uname/${uname}`)
        .then(res => {
            setUnameAvabile('avabile');
            setUsername(uname);
        }).catch(err => {
            setUnameAvabile('is-invalid');
        });
    };
    const checkPasswords = password_check => {
        if(password_check !== password){
            setPasswordError('Passwords don\'t match...');
            setConfirmPassword(null);
        } else {
            setPasswordError(null);
            setConfirmPassword(password_check);
        }    
    };

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Form.Control className={emailError && 'is-invalid'} type="email" placeholder="Email" onChange={
                        (e) => {
                            setEmail(e.target.value);
                        }
                    } />
                {
                    emailError &&
                    <span style={{
                        fontSize:'12px'
                    }} className="help-block text-danger">{ emailError }</span>
                }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Form.Control className={`${unameAvabile}`} type="text" placeholder="Username" onChange={
                        (e) => {
                            if(e.target.value !== '')
                                checkUname(e.target.value)
                        }
                    } />
                {
                    (unameAvabile === 'is-invalid') &&
                    <span style={{
                        fontSize:'12px'
                    }} className="help-block text-danger">Username already taken...</span>
                }
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
                    <Form.Control className={passwordError && 'is-invalid'} onChange={
                        (e) => {
                            checkPasswords(e.target.value)
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
