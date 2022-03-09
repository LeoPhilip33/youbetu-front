
import './Video.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes, useSearchParams, useParams } from "react-router-dom"
import React from "react";
import axios from 'axios'
import url from '../../config';
import ReactPlayer from 'react-player'
import like from '../../img/icons/like.png';
import dislike from '../../img/icons/dislike.png';
import share from '../../img/icons/share.png';
import download from '../../img/icons/download.png';
import more from '../../img/icons/more.png';
import { authenticatedFetch } from '../../utils';


function Video() {
    const [video, setVideo] = React.useState({
        title: '',
        description: '',
        video: '',
        miniature: '',
        likes: '',
        dislikes: '',
        views: '',
        created_at: '',
    })

    const [user, setUser] = React.useState({
        id: '',
        name: '',
        photo: '',
        subscriber: '',
    })

    const [sub, setSub] = React.useState(false)
    let { id } = useParams();

    const subscribe = (e: any) => {
        const data = {
            user_id: e,
            subscriber_id: localStorage.userId
        }
        setSub(!sub)
        authenticatedFetch('POST', `/subscribe`, data)
            .then(res => {
                getVideo()
            })
    }

    const getVideo = () => {
        axios.get(`${url}/video/${id}`)
            .then((res) => {
                let dataVideo = res.data[0]
                let dataUser = res.data[1]
                setVideo({
                    title: dataVideo.title,
                    description: dataVideo.description,
                    video: dataVideo.video,
                    miniature: dataVideo.miniature,
                    likes: dataVideo.likes,
                    dislikes: dataVideo.dislikes,
                    views: dataVideo.views,
                    created_at: dataVideo.created_at,
                })
                setUser({
                    id: dataUser.id,
                    name: dataUser.name,
                    photo: dataUser.photo,
                    subscriber: dataUser.subscriber,

                });
            })
    }
    const checkSub = () => {
        const data = {
            id: id,
            subscriber: localStorage.userId
        }
        axios.get(`${url}/check-sub/${id}&${localStorage.userId}`)
            .then((res) => {
                setSub(res.data)

            })
    }

    React.useEffect(() => {
        getVideo()
        checkSub()
    }, []);
    return (
        <section className='video-suggestion-container'>
            <div className='video-container'>
                <div className='player-container'>
                    <ReactPlayer width="100%" height="100%" controls={true} url={uploadUrl + '/videos/' + video.video} />
                </div>
                <h1>{video.title}</h1>
                <div className='view-share-container'>
                    <div className='views-container'>
                        <p >{video.views} vues - {video.created_at.substring(0, 10)}</p>
                    </div>
                    <div className='video-info-container'>
                        <div className="like-container">
                            <img src={like} alt="" />
                            <p>{video.likes}</p>
                        </div>
                        <div className="dislike-container">
                            <img src={dislike} alt="" />
                            <p>{video.dislikes}</p>
                        </div>
                        <div className="share-container">
                            <img src={share} alt="" />
                            <p>Partager</p>
                        </div>
                        <div className="share-container">
                            <img src={download} alt="" />
                            <p>Enregistrer</p>
                        </div>
                        <div className="share-container">
                            <img src={more} alt="" />

                        </div>
                    </div>
                </div>
                <div className="channel-container">
                    <div className='channel-info-container'>
                        <div className='username-subscriber-subsribe-container'>
                            <img src={uploadUrl + '/photos/' + user.photo} alt="" />
                            <div className='username-subscriber'>
                                <p className='username'>{user.name}</p>
                                <p className='subscriber'>{user.subscriber} abonnés</p>
                            </div>
                        </div>
                        <div className='subscribe-join-container'>
                            <button className='join'>REJOINDRE</button>
                            {!sub ?
                                <button onClick={() => subscribe(user.id)} className='subscribe'>S'ABONNER</button>
                                :
                                <button onClick={() => subscribe(user.id)} className='subscribe active'>ABONNÉ</button>
                            }
                        </div>
                    </div>

                </div>
                <div className='description'>
                    {video.description}
                </div>
            </div>
            <div className="suggestion-container">
            </div>

        </section>
    );
}

export default Video;
