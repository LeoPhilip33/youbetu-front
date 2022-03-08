
import './VideoMiniature.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"

function VideoMiniature(props: any) {
    return (
        <div className='video-miniature-container'>
            <Link to={`/watch/${props.id}`} className='video-miniature'>
                <img src={uploadUrl + '/miniatures/' + props.miniature} />
                <h2>{props.title}</h2>
                <h1>{props.views}</h1>
            </Link>
        </div>
    );
}

export default VideoMiniature;
