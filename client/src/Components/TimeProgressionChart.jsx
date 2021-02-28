import React, { useEffect, useState } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'

export default function StatsPage(props) {

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title:{
            text: "Progressions of Emojis Through Time"
        },
        subtitles: [{
            text: "This is how your post's emojis progressed through time"
        }],
        axisX: {
            title: "States"
        },
        data: [{
            type: "column",
            name: "😃",
            showInLegend: true,
            color:"#f2e03f",
            dataPoints: [
                { label: "January",  y: getFrequency('😃', 0, props.posts) },
                { label: "February", y: getFrequency('😃', 1, props.posts) },
                { label: "March", y: getFrequency('😃', 2, props.posts) },
                { label: "April",  y: getFrequency('😃', 3, props.posts) },
                { label: "May",  y: getFrequency('😃', 4, props.posts) },
                { label: "June",  y: getFrequency('😃', 5, props.posts) },
                { label: "July",  y: getFrequency('😃', 6, props.posts) },
                { label: "August",  y: getFrequency('😃', 7, props.posts) },
                { label: "September",  y: getFrequency('😃', 8, props.posts) },
                { label: "October",  y: getFrequency('😃', 9, props.posts) },
                { label: "November",  y: getFrequency('😃', 10, props.posts) },
                { label: "December",  y: getFrequency('😃', 11, props.posts) },
            ]
        },
        {
            type: "column",
            name: "😍",
            showInLegend: true,
            color:"#f24b3f",
            dataPoints: [
                { label: "January",  y: getFrequency('😍', 0, props.posts) },
                { label: "February", y: getFrequency('😍', 1, props.posts) },
                { label: "March", y: getFrequency('😍', 2, props.posts) },
                { label: "April",  y: getFrequency('😍', 3, props.posts) },
                { label: "May",  y: getFrequency('😍', 4, props.posts) },
                { label: "June",  y: getFrequency('😍', 5, props.posts) },
                { label: "July",  y: getFrequency('😍', 6, props.posts) },
                { label: "August",  y: getFrequency('😍', 7, props.posts) },
                { label: "September",  y: getFrequency('😍', 8, props.posts) },
                { label: "October",  y: getFrequency('😍', 9, props.posts) },
                { label: "November",  y: getFrequency('😍', 10, props.posts) },
                { label: "December",  y: getFrequency('😍', 11, props.posts) },
            ]
        },
        {
            type: "column",
            name: "😢",
            color:"#3fcbf2",
            showInLegend: true,
            dataPoints: [
                { label: "January",  y: getFrequency('😢', 0, props.posts) },
                { label: "February", y: getFrequency('😢', 1, props.posts) },
                { label: "March", y: getFrequency('😢', 2, props.posts) },
                { label: "April",  y: getFrequency('😢', 3, props.posts) },
                { label: "May",  y: getFrequency('😢', 4, props.posts) },
                { label: "June",  y: getFrequency('😢', 5, props.posts) },
                { label: "July",  y: getFrequency('😢', 6, props.posts) },
                { label: "August",  y: getFrequency('😢', 7, props.posts) },
                { label: "September",  y: getFrequency('😢', 8, props.posts) },
                { label: "October",  y: getFrequency('😢', 9, props.posts) },
                { label: "November",  y: getFrequency('😢', 10, props.posts) },
                { label: "December",  y: getFrequency('😢', 11, props.posts) },
            ]
        },
        {
            type: "column",
            name: "🤮",
            showInLegend: true,
            color:"#3ff281",
            dataPoints: [
                { label: "January",  y: getFrequency('🤮', 0, props.posts) },
                { label: "February", y: getFrequency('🤮', 1, props.posts) },
                { label: "March", y: getFrequency('🤮', 2, props.posts) },
                { label: "April",  y: getFrequency('🤮', 3, props.posts) },
                { label: "May",  y: getFrequency('🤮', 4, props.posts) },
                { label: "June",  y: getFrequency('🤮', 5, props.posts) },
                { label: "July",  y: getFrequency('🤮', 6, props.posts) },
                { label: "August",  y: getFrequency('🤮', 7, props.posts) },
                { label: "September",  y: getFrequency('🤮', 8, props.posts) },
                { label: "October",  y: getFrequency('🤮', 9, props.posts) },
                { label: "November",  y: getFrequency('🤮', 10, props.posts) },
                { label: "December",  y: getFrequency('🤮', 11, props.posts) },
            ]
        },
        {
            type: "column",
            name: "😎",
            showInLegend: true,
            color:"#808080",
            dataPoints: [
                { label: "January",  y: getFrequency('😎', 0, props.posts) },
                { label: "February", y: getFrequency('😎', 1, props.posts) },
                { label: "March", y: getFrequency('😎', 2, props.posts) },
                { label: "April",  y: getFrequency('😎', 3, props.posts) },
                { label: "May",  y: getFrequency('😎', 4, props.posts) },
                { label: "June",  y: getFrequency('😎', 5, props.posts) },
                { label: "July",  y: getFrequency('😎', 6, props.posts) },
                { label: "August",  y: getFrequency('😎', 7, props.posts) },
                { label: "September",  y: getFrequency('😎', 8, props.posts) },
                { label: "October",  y: getFrequency('😎', 9, props.posts) },
                { label: "November",  y: getFrequency('😎', 10, props.posts) },
                { label: "December",  y: getFrequency('😎', 11, props.posts) },
            ]
        },
              ]
    }

    function getFrequency(emoji, date, postsList) {
        const lista = postsList.filter(item => item.emoji === emoji);
        lista.forEach(item => console.log(new Date(item.time).getMonth()));
        const items = lista.filter(item => item.emoji === emoji && new Date(item.time).getMonth() === date);
        return items.length;
    }

    return (
        <CanvasJSChart options={options} />
    )
}
