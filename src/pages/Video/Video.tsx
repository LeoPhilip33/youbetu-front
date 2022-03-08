
import './Video.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes, useSearchParams, useParams } from "react-router-dom"
import React from "react";
import axios from 'axios'
import url from '../../config';

function Video() {
    const [video, setVideo] = React.useState([])
    let { id } = useParams();

    React.useEffect(() => {
        console.log(`${url}/video/${id}`)
        axios.get(`${url}/video/${id}`)
            .then((res) => {
                console.log(res.data)
                setVideo(res.data);
            })
    }, []);
    return (
        <section>
            <h1>Title</h1>
        </section>
    );
}

export default Video;
