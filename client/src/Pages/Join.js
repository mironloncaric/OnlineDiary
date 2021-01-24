import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../providers/UserProvider';

import JoinForm from '../Components/JoinForm';

export default function Join(props) {

    const { user } = useAuth();

    return (!user ?
            <JoinForm />
            :
            <Redirect to="/post" />
	   );
    
}
