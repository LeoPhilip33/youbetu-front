
import './VideoMiniature.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import { authenticatedFetch, strDescriptionMaxLenght, strTitleMaxLenght } from '../../utils';
import React from 'react';

function VideoMiniatureDasboard(props: any) {

    const [existing, setExisting] = React.useState(true)

    const deleteVideo = () => {
        let result = window.confirm("Want to delete?");
        if (result) {
            authenticatedFetch('DELETE', `/videos/${props.id}`)
                .then((res) => {
                    console.log(res)
                    props.reload();
                })
        }
    }
    return (

        < div className='video-miniature-container' >
            < div onClick={() => deleteVideo()
            } className='delete' >
                <div></div><div></div>
            </div >
            <Link to={`/watch/${props.id}`} className='video-miniature'>
                <img className='miniature' src={uploadUrl + '/miniatures/' + props.miniature} />
                <div className='user-view-container'>
                    <img className='userImg' src={uploadUrl + '/photos/' + props.userPhoto} alt="" />
                    <div>
                        <h2>{strTitleMaxLenght(props.title)}</h2>
                        <h3>{props.username}</h3>
                        <h3>{strDescriptionMaxLenght(props.description)}</h3>
                        <h4>{props.views} vues - {props.created_at.substring(0, 10)} </h4>
                    </div>
                </div>
            </Link>
        </div >
    );
}

export default VideoMiniatureDasboard;
