import React from 'react'
import Trend from './Trend'

export default function Trends(props) {
    return (
        <div>
            {
                props.trends &&
                props.trends.map((trend, key) => {
                    return <Trend
                        value={trend.value}
                        key={key}
                    />
                })
            }
        </div>
    )
}
