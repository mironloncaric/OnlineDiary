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
                    <p>Social Network inspired by the concept of a personal diary.</p>
	    	<p>Express yourself explicitly through emojis and your favourite music...</p>
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
