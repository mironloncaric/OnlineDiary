import React, { useEffect, useState } from 'react';

import { useAuth } from '../providers/UserProvider.jsx';
import SecondaryNav from '../Components/SecondaryNav';
import NotificationPageItem from '../Components/NotificationPageItem';

export default function NotificationsPage() {

    const { notifications, notificationsByRecieverId } = useAuth();

    const removeItem = key => {
		notificationsByRecieverId();
		console.log('These are notifications:', notifications);
    };
    
    return (
	<div>
	    <SecondaryNav />
	    <div className="page-container">
		<h3>Notifications:</h3>
		<div>
		    {
			    (notifications && notifications.length>0) ?
					notifications.map((notification, key) => (
						<NotificationPageItem
						key={key}
						id={key}
						notification={notification}
						removeItem={removeItem}
						/>
					))
					:
					<h4 className="no-posts">No notifications</h4>
		    }
		</div>
	    </div>
	</div>
    );
}
