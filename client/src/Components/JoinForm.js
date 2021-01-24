import React from 'react';

import './JoinForm.css';

import SignupForm from './SignupForm';
import TherapistsJoinForm from './TherapistsJoinForm';

export default function JoinForm() {
    return (
        <div className="join-container" style={{
            padding:'20px'
        }}>
            <div className="row join-form">
                <div className="col join-description">
                    <h2>Online Diary</h2>
                    <p>Exercitation ad culpa aliqua ullamco consequat laboris excepteur cillum aliquip amet esse nostrud anim. Mollit labore pariatur est nulla reprehenderit adipisicing Lorem pariatur qui quis duis occaecat anim ullamco. Fugiat exercitation est sint reprehenderit eu excepteur.</p>
                </div>
                <div className="col signup-form">
                    <SignupForm />
                </div>
            </div>
          <div className="row dear-diary-for-therapists">
            <div className="col">
	      <h3 style={{
                  color:'white'
              }}>DearDiary for Mental Health Professionals:</h3>
	      <p style={{
                  color:'white'
              }}>Use DearDiary website to manage groups of patients...</p>
              <div className="therapists-signup">
                <TherapistsJoinForm />
              </div>
            </div>
          </div>
        </div>
    );
}
