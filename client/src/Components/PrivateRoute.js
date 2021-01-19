import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../providers/UserProvider'

export default function PrivateRoute(props) {

    const { user } = useAuth()

    return (
            user ?
        <Route path={props.path}>
            {props.component}
        </Route>
        :
        <Redirect to="/join" />
    )
}
