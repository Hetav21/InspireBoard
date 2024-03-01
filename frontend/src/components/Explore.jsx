import axios from 'axios'
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import "../index.css";
import { Suspense } from "react";
import AppBar from './AppBar';

function display(pin) {
    return (<div className='border-black border-solid' key={pin.postId}>
    <h1>{pin.title}</h1>
    <p>{pin.about}</p>
    <p>{pin.category}</p>
    <p>{pin.userId}</p>
    <object data={pin.url} width='200' height='200'>
        <img src='https://www.online-tech-tips.com/wp-content/uploads/2022/03/image-41.jpeg' alt='Not Found'></img>
    </object>
    <br></br>
</div>);
}

export default function Explore() {
    const [content, setContent] = useState([]);
    const url = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8787' + url.pathname + url.search)
            .then(res => {
                setContent(res.data.pins);
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }, [url]);

    return (
        <div >
            <AppBar></AppBar>
            {content.map(display)}
        </div>
    )
}