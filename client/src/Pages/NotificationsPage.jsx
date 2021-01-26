import React, { useEffect, useState } from 'react';

import { useAuth } from '../providers/UserProvider.jsx';
import SecondaryNav from '../Components/SecondaryNav';
import NotificationPageItem from '../Components/NotificationPageItem';

export default function NotificationsPage() {

    const { notifications } = useAuth();

    const removeItem = key => {
	
    }
    
    return (
	<div>
	    <SecondaryNav />
	    <div className="page-container">
		<h3>Notifications Page</h3>
		<div>
		    {
			notifications ?
			notifications.map((notification, key) => (
			    <NotificationPageItem
				key={key}
				id={key}
				notification={notification}
			    />
			))
			:
			<span>No notifications</span>
		    }
		</div>
	    </div>
	</div>
    );
}
