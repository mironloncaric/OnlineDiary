import React, { useEffect, useState } from 'react'
import Comments from './Comments'

import './Entries.css'
import Entry from './Entry'

export default function Entries({ entries }) {

    const [rerender, setRerender] = useState();

    useEffect(() => {
	setRerender(rerender+1);
    }, [entries]);

    return (
        <div>
            { (entries.length>0) ? 
                entries.map(({ postBody, uname, hashtags, emoji, date, uid, _id }, id) => (
                    <div key={ id }>
                        <Entry
                            date={ date }
                            content={ postBody }
                            emoji={ emoji }
                            hashtags={ hashtags }
                            uname={ uname }
                            id={ _id }
                            uid={ uid }
                        />
                    </div>
                ))
                :
                <h4 className="no-posts">No posts yet... 😕</h4>
            }
        </div>
    );
}
