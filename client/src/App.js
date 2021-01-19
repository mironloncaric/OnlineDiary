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

import MainNavigation from './Components/MainNavigation'

import PrivateRoute from './Components/PrivateRoute'

function App(props) {
  return (
    <>
      <BrowserRouter>
        <MainNavigation />
        <Switch>
          <PrivateRoute path="/following" component={<FollowingPage />} />
          <PrivateRoute path="/post" component={<PostsPage />} />
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
