import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../providers/UserProvider.jsx';
import AddPeople from '../Components/AddPeople.jsx';
import SecondaryNav from '../Components/SecondaryNav';
import NewEntryForm from '../Components/NewEntryForm';
import Entries from '../Components/Entries';

export default function GroupItemPage() {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const params = useParams();
    const { isTherapist, user, notifications, handleSetNotifications } = useAuth();

    const [group, setGroup] = useState(null);
    const [value, setValue] = useState(0); // integer state
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios.get(`${url}/group-by-id/${params.id}`)
        .then(res => {
            setGroup(res.data);
        });
        axios.get(`${url}/posts-by-group-id/${params.id}`)
             .then(res => {
                 setEntries(res.data);
             })
    }, []);

    const handleSetEntries = (newEntrie) => {
        setEntries(entires => [newEntrie, ...entries]);
        return () => setValue(value => value + 1); // update the state to force render
    };

    if(group)
        return (
            <div>
                <SecondaryNav />
                <div className="page-container">
                    <h3>{group.name}</h3>
                    {
                        isTherapist &&
                        <AddPeople group={group} />
                    }
                    <NewEntryForm group={params.id} setEntries={handleSetEntries} />
                    <hr />
                    <Entries entries={ entries } />
                </div>
            </div>
        )
    else {
        return (
            <div>
                <SecondaryNav />
                <div className="page-conatiner">
                    <h3>Can't find that group...</h3>
                </div>
            </div>
        )
    }
}
