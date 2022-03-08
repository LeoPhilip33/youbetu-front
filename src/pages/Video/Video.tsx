
import './Video.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes, useSearchParams, useParams } from "react-router-dom"
import React from "react";
import axios from 'axios'
import url from '../../config';

function Video() {
    const [video, setVideo] = React.useState({
        title: '',
        description: '',
        video: '',
        miniature: '',
        likes: '',
        views: '',
        created_at: '',
    })
    let { id } = useParams();

    React.useEffect(() => {
        axios.get(`${url}/video/${id}`)
            .then((res) => {
                console.log(res.data)
                let data = res.data
                setVideo({
                    title: data.title,
                    description: data.description,
                    video: data.video,
                    miniature: data.miniature,
                    likes: data.likes,
                    views: data.views,
                    created_at: data.created_at,
                });
            })
    }, []);
    return (
        <section>
            <h1>{video.title}</h1>
            <video muted autoPlay src={uploadUrl + '/videos/' + video.video}></video>
            <p>{video.views}</p>
            <p>{video.likes}</p>
            <p>{video.created_at}</p>
        </section>
    );
}

export default Video;
