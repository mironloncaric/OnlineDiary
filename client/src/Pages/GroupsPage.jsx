import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/UserProvider.jsx';

import SecondaryNav from '../Components/SecondaryNav';
import CreateNewGroupForm from '../Components/CreateNewGroupForm';
import GroupItem from '../Components/GroupItem.jsx';
import axios from 'axios';

export default function GroupsPage() {

	const { isTherapist, user } = useAuth();
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
	
	const [groups, setGroups] = useState();

	useEffect(() => {
		axios.get(`${url}/groups-by-creator/${user.uid}`)
		.then(res => {
			setGroups(res.data);
		})
	}, [])
	useEffect(() => {
		console.log('groups:', groups)
	}, [groups])

    return (
	<div>
	    <SecondaryNav />
	    <div className="page-container">
		{
		    isTherapist && <CreateNewGroupForm />
		}
		<h3>Your Groups:</h3>
		{
			groups && 
			groups.map(group => (
				<GroupItem group={group} />
			))
		}
	    </div>
	</div>
    );
}
