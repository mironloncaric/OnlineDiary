import React, { useEffect, useState } from 'react';

import NewEntryForm from '../Components/NewEntryForm';
import Entries from '../Components/Entries';
import SecondaryNav from '../Components/SecondaryNav';
import axios from 'axios';
import { useAuth } from '../providers/UserProvider';

export default function PostsPage(props) {

    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000';
    const [entries, setEntries] = useState([]);

    const { user } = useAuth();
    const [value, setValue] = useState(0); // integer state

    useEffect(() => {
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
