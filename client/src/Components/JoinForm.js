import React from 'react'

import './JoinForm.css'

import SignupForm from './SignupForm'

export default function JoinForm() {
    return (
        <div className="join-container" style={{
            padding:'20px'
        }}>
            <div className="row">
                <div className="col join-description">
                    <h2>Online Diary</h2>
                    <p>Exercitation ad culpa aliqua ullamco consequat laboris excepteur cillum aliquip amet esse nostrud anim. Mollit labore pariatur est nulla reprehenderit adipisicing Lorem pariatur qui quis duis occaecat anim ullamco. Fugiat exercitation est sint reprehenderit eu excepteur.</p>
                </div>
                <div className="col signup-form">
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}
