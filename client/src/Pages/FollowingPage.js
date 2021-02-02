import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Entries from '../Components/Entries';
import SecondaryNav from '../Components/SecondaryNav';
import Suggestions from '../Components/Suggestions';
import { useAuth } from '../providers/UserProvider';

export default function FollowingPage() {

    const { user } = useAuth();
    const [entries, setEntries] = useState([]);
    const [location, setLocation] = useState(null);
    const url = (process.env.NODE_ENV === 'production') ? 'https://ediary1api.herokuapp.com' : 'http://localhost:5000' ;

    useEffect(() => {
        axios.get(`${url}/following-posts/${user.uid}`)
            .then(res => {
                setEntries(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <SecondaryNav />
            <div className="page-container">
            <Suggestions />
              <h3 style={{
                  marginBottom:'20px'
              }}>From People you Follow</h3>
                {
                    (entries.length>0) ?
                    <Entries entries={ entries } />
                    :
                    <h4 className="no-posts">No posts to show...</h4>
                }
            </div>
        </>
    )
}
