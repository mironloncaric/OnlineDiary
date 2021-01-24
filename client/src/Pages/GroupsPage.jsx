import React, { useEffect } from 'react';
import { useAuth } from '../providers/UserProvider.jsx'

import SecondaryNav from '../Components/SecondaryNav'

export default function GroupsPage() {

    const { isTherapist } = useAuth();

    return (
	<div className="page-container">
	    <h3>Your Groups:</h3>
	    { isTherapist ?
	      <p>Therapist...</p>
	      :
	      <p>Patient...</p>
	    }
	</div>
    );
}
