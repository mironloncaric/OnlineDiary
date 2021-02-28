import React, { useEffect, useState } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'

export default function StatsPage(props) {

    const options = {
        title: {
            text: "Frequency Chart"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "😃", color:"#f2e03f", y: getFrequency('😃', props.posts)},
                { label: "😍", color:"#f24b3f", y: getFrequency('😍', props.posts)  },
                { label: "😢", color:"#3fcbf2", y: getFrequency('😢', props.posts)  },
                { label: "🤮", color:"#3ff281", y: getFrequency('🤮', props.posts)  },
                { label: "😎", color:"#808080", y: getFrequency('😎', props.posts)  },
            ]
        }]
    }
    function getFrequency(emoji, postsList) {
        const lista = postsList.filter(item => item.emoji === emoji)
        return lista.length
    }

    return (
        <CanvasJSChart options={options} />
    )
}
