
import './VideoMiniature.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import { strDescriptionMaxLenght, strTitleMaxLenght } from '../../utils';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function VideoMiniature(props: any) {
    return (
        <div className='video-miniature-container'>


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
        </div>
    );
}

export default VideoMiniature;
