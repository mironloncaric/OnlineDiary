import React from 'react'
import './App.css'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'


import PostsPage from './Pages/PostsPage';
import FollowingPage from './Pages/FollowingPage';
import Join from './Pages/Join';
import ProfilePage from './Pages/ProfilePage';
import SettingsPage from './Pages/SettingsPage';
import TrendsPage from './Pages/TrendsPage';
import { useAuth } from './providers/UserProvider';
import Notification from './Components/Notification';
import GroupsPage from './Pages/GroupsPage.jsx';

import MainNavigation from './Components/MainNavigation';

import PrivateRoute from './Components/PrivateRoute';
import { useEffect } from 'react';
import socketio from 'socket.io-client';

function App(props) {
  const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

  const { user, followers, handleSetNotifications, notifications } = useAuth();
  
  useEffect(() => {
    if(user){
      const socket = socketio.connect(url)
      socket.on(`notification/${user.uid}`, data => {
          handleSetNotifications(data)
      })
    }
  }, [user])

    useEffect(() => {
	console.log(notifications)
    }, [notifications])


  return (
    <>
      <BrowserRouter>
          <MainNavigation />
          <div aria-atomic="true" style={{
	  }}aria-live="polite" className="notifications-container">
              <div style={{
		      bottom:0,
		      right:0
		}}>
		{
		    notifications.map(notif => {
			return <Notification body={notif} />
		    })
		}
	      </div>
	  </div>
        <Switch>
          <PrivateRoute path="/following" component={<FollowingPage />} />
          <PrivateRoute path="/post" component={<PostsPage />} />
          <PrivateRoute path="/settings" component={<SettingsPage />} />
          <PrivateRoute path="/trends" component={<TrendsPage />} />
          <PrivateRoute path="/profile/:uid" component={<ProfilePage />} />
          <PrivateRoute path="/groups" component={<GroupsPage />} />
          <Route path="/join">
            <Join />
          </Route>
          <Redirect to="/join" />
        </Switch>
      </BrowserRouter>
      </>
  );
}

export default App;
