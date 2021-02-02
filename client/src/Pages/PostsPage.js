import React, { useEffect, useState } from 'react';

import NewEntryForm from '../Components/NewEntryForm';
import Entries from '../Components/Entries';
import SecondaryNav from '../Components/SecondaryNav';
import axios from 'axios';
import { useAuth } from '../providers/UserProvider';
import socketio from 'socket.io-client';
const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';

export default function PostsPage(props) {

    const [entries, setEntries] = useState([]);

    const { user, notifications, handleSetNotifications } = useAuth();
    const [value, setValue] = useState(0); // integer state

    useEffect(() => {
        console.log(notifications);
        axios.get(`${url}/uposts/${user.uid}`)
            .then(res => {
                if(!res.error)
                    res.data.reverse();
                    setEntries(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSetEntries = (newEntrie) => {
        setEntries(entires => [newEntrie, ...entries]);
        return () => setValue(value => value + 1); // update the state to force render
    };

    return (
        <>
          <SecondaryNav />
          <div className="page-container">
                <NewEntryForm group={null} setEntries={handleSetEntries} />
                <hr />
                <Entries entries={ entries } />
            </div>
        </>
    );
}
