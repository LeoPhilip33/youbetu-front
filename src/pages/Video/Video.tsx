
import './Video.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes, useSearchParams, useParams } from "react-router-dom"
import React from "react";
import axios from 'axios'
import url from '../../config';
import ReactPlayer from 'react-player'
import likeImg from '../../img/icons/like.png';
import likeImgChecked from '../../img/icons/like-checked.png';
import dislikeImg from '../../img/icons/dislike.png';
import dislikeImgChecked from '../../img/icons/dislike-checked.png';
import shareImg from '../../img/icons/share.png';
import downloadImg from '../../img/icons/download.png';
import moreImg from '../../img/icons/more.png';
import { authenticatedFetch } from '../../utils';


function Video() {
    const [video, setVideo] = React.useState({
        id: '',
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
    const [likeValue, setLikeValue] = React.useState<any>(false)
    const [dislikeValue, setDislikeValue] = React.useState<any>(false)
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
                    id: dataVideo.id,
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
    const checkLike = () => {
        const data = {
            id: id,
            subscriber: localStorage.userId
        }
        axios.get(`${url}/check-like/${id}&${localStorage.userId}`)
            .then((res) => {
                setLikeValue(res.data)

            })
    }

    const like = (e: string) => {
        const data = {
            video_id: e,
            liker_id: localStorage.userId
        }
        authenticatedFetch('POST', `/like`, data)
            .then(res => {
                getVideo()
                setLikeValue(res.data)
                if (res.data == 1 && dislikeValue == 1) {
                    dislike(e)
                }
            })
    }

    const checkDislike = () => {
        const data = {
            id: id,
            subscriber: localStorage.userId
        }
        axios.get(`${url}/check-dislike/${id}&${localStorage.userId}`)
            .then((res) => {
                setDislikeValue(res.data)

            })
    }

    const dislike = (e: string) => {
        const data = {
            video_id: e,
            disliker_id: localStorage.userId
        }
        authenticatedFetch('POST', `/dislike`, data)
            .then(res => {
                getVideo()
                setDislikeValue(res.data)
                if (res.data == 1 && likeValue == 1) {
                    like(e)
                }
            })
    }

    React.useEffect(() => {
        getVideo()
        checkSub()
        checkLike()
        checkDislike()
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
                        <div onClick={() => like(video.id)} className="like-container">
                            {likeValue ?
                                <img src={likeImgChecked} alt="" />
                                :
                                <img src={likeImg} alt="" />
                            }
                            <p>{video.likes}</p>
                        </div>
                        <div onClick={() => dislike(video.id)} className="dislike-container">
                            {dislikeValue ?
                                <img src={dislikeImgChecked} alt="" />
                                :
                                <img src={dislikeImg} alt="" />
                            }
                            <p>{video.dislikes}</p>
                        </div>
                        <div className="share-container">
                            <img src={shareImg} alt="" />
                            <p>Partager</p>
                        </div>
                        <div className="share-container">
                            <img src={downloadImg} alt="" />
                            <p>Enregistrer</p>
                        </div>
                        <div className="share-container">
                            <img src={moreImg} alt="" />

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
