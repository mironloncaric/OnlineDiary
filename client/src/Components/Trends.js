import React from 'react'
import Trend from './Trend'

export default function Trends(props) {
    return (
        <div>
            {
                props.trends.length > 0 ?
                    props.trends.map((trend, key) => (
                        <Trend
                            value={trend.value}
                            key={key}
                        />
                    ))
                :
                    <div>
                        <h4 style={{
                            marginBottom:'5px'
                        }} className="no-posts">You have no trends yet 😕</h4>
                        <h5 style={{
                            marginTop:'5px'
                        }} className="no-posts">Try making a post...</h5>
                    </div>
            }
        </div>
    )
}
