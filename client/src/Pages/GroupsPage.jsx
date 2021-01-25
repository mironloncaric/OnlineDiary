import React, { useEffect } from 'react';
import { useAuth } from '../providers/UserProvider.jsx';

import SecondaryNav from '../Components/SecondaryNav';
import CreateNewGroupForm from '../Components/CreateNewGroupForm';

export default function GroupsPage() {

    const { isTherapist } = useAuth();

    return (
	<div>
	    <SecondaryNav />
	    <div className="page-container">
		{
		    isTherapist && <CreateNewGroupForm />
		}
		<h3>Your Groups:</h3>
		{ isTherapist ?
		    <p>Therapist...</p>
		    :
		    <p>Patient...</p>
		}
	    </div>
	</div>
    );
}
