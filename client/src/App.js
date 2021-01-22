import React from 'react'
import './App.css'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'


import PostsPage from './Pages/PostsPage'
import FollowingPage from './Pages/FollowingPage'
import Join from './Pages/Join'
import ProfilePage from './Pages/ProfilePage'
import SettingsPage from './Pages/SettingsPage'
import TrendsPage from './Pages/TrendsPage'
import { useAuth } from './providers/UserProvider'

import MainNavigation from './Components/MainNavigation'

import PrivateRoute from './Components/PrivateRoute'
import { useEffect } from 'react'
import socketio from 'socket.io-client'

function App(props) {
  const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000'

  const { user, followers, handleSetNotifications, notifications } = useAuth()
  
  useEffect(() => {
    if(user){
      console.log('yo yo yo')
      const socket = socketio.connect(url)
      console.log('hello')
      socket.on(`notification/${user.uid}`, data => {
          console.log('hello')
          handleSetNotifications(data)
          console.log('bie')
          console.log(notifications)
      })
    }
  }, [user])


  return (
    <>
      <BrowserRouter>
        <MainNavigation />
        <Switch>
          <PrivateRoute path="/following" component={<FollowingPage />} />
          <PrivateRoute path="/post" component={<PostsPage />} />
          <PrivateRoute path="/settings" component={<SettingsPage />} />
          <PrivateRoute path="/trends" component={<TrendsPage />} />
          <PrivateRoute path="/profile/:uid" component={<ProfilePage />} />
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
