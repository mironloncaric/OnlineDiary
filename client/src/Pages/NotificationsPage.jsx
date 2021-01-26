import React, { useEffect, useState } from 'react';

import { useAuth } from '../providers/UserProvider.jsx';
import SecondaryNav from '../Components/SecondaryNav';
import NotificationPageItem from '../Components/NotificationPageItem';

export default function NotificationsPage() {

    const { notifications, notificationsByRecieverId } = useAuth();

    const removeItem = key => {
	notificationsByRecieverId();
	console.log('These are notifications:', notifications)
    }
    
    return (
	<div>
	    <SecondaryNav />
	    <div className="page-container">
		<h3>Notifications Page</h3>
		<div>
		    {
			notifications[0] ?
			notifications[0].map((notification, key) => (
			    <NotificationPageItem
				key={key}
				id={key}
				notification={notification}
				removeItem={removeItem}
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
