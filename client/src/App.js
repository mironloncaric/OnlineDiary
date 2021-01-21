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


function App(props) {

  const { user } = useAuth()

  useEffect(() => {
  }, [])

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
