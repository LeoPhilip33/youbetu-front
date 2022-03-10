
import './Video.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes, useSearchParams, useParams } from "react-router-dom"
import React, { useState } from "react";
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
import Comment from '../../components/Comment/Comment'
import VideoMiniature from '../../components/Video/VideoMiniature';


function Video(this: any) {

    const [state, setState] = useState({
        comment: '',
    })

    const [comments, setComments] = React.useState([])
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
    const [photo, setPhoto] = React.useState<String>()
    const [videos, setVideos] = React.useState([])

    let { id } = useParams();


    const getVideos = () => {
        axios.get(`${url}/videos`)
            .then((res) => {
                setVideos(res.data);
            })

    };


    const setUserPhoto = () => {
        authenticatedFetch('GET', `/user/${localStorage.userId}`)
            .then((res) => {
                setPhoto(res.data.photo);

            })
    }


    const handleChangeComment = (e: { target: { value: any } }) => {
        setState({
            comment: e.target.value,
        })
    }

    const submit = () => {
        console.log('aaaaaaaa')
        const data = {
            video_id: video.id,
            user_id: localStorage.userId,
            comment: state.comment
        }
        authenticatedFetch('POST', `/comment`, data)
            .then(res => {
                getVideo()
            })

    }

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

    const getVideo = async () => {
        await axios.get(`${url}/video/${id}`)
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
                getComments(res.data[0].id)
            })
            .finally(() => {

            })
    }
    const checkSub = async () => {
        const data = {
            id: id,
            subscriber: localStorage.userId
        }
        await axios.get(`${url}/check-sub/${id}&${localStorage.userId}`)
            .then((res) => {
                setSub(res.data)

            })
    }
    const checkLike = async () => {

        await axios.get(`${url}/check-like/${id}&${localStorage.userId}`)
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

    const checkDislike = async () => {

        await axios.get(`${url}/check-dislike/${id}&${localStorage.userId}`)
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

    const getComments = async (e: Number) => {
        await axios.get(`${url}/comments/${e}`)
            .then(res => {
                console.log(res.data)
                setComments(res.data)
            })
    }

    React.useEffect(() => {
        getVideo()
        checkSub()
        checkLike()
        checkDislike()
        setUserPhoto()
        getVideos()
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
                <div className="comments-container">
                    <div className='user-comment'>
                        <img className='profile-img' src={uploadUrl + '/photos/' + photo} alt="" />
                        <div>
                            <input type="text" placeholder='Ajouter un commentaire' value={state.comment} onChange={handleChangeComment} />
                            <button onClick={() => submit()}>Ajouter un commentaire</button>
                        </div>
                    </div>
                    <div className='other-comments-container'>
                        {comments.map((comment, index) => {
                            return <Comment key={index} {...comment} />
                        })}
                    </div>
                </div>
            </div>
            <div className="suggestion-container">
                {videos.map((video, index) => {
                    return <VideoMiniature key={index} {...video} />
                })}
            </div>

        </section>
    );
}

export default Video;
