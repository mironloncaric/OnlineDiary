import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/UserProvider.jsx';

import SecondaryNav from '../Components/SecondaryNav';
import CreateNewGroupForm from '../Components/CreateNewGroupForm';
import GroupItem from '../Components/GroupItem.jsx';
import axios from 'axios';

export default function GroupsPage() {

    const { isTherapist, user } = useAuth();
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
	
	const [groups, setGroups] = useState([]);

    useEffect(() => {
	if(isTherapist) {
	    axios.get(`${url}/groups-by-creator/${user.uid}`)
	    .then(res => {
		    setGroups(res.data);
	    });
	} else {
	    axios.get(`${url}/groups-by-participant/${user.uid}`)
		 .then(res => {
		     console.log('Find groups:', res.data);
		     res.data.forEach(item => {
			 axios.get(`${url}/group-by-id/${item.groupId}`)
			      .then(response => {
				  console.log(response.data);
				  setGroups(groups => [...groups, response.data]);
			 })
			 
		     })
	    })
	}
    }, []);
    useEffect(() => {
	console.log('group:', groups);
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
