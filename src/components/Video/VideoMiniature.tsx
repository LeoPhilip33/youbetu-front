
import './VideoMiniature.scss';
import { uploadUrl } from '../../config';

function VideoMiniature(props: any) {
    return (
        <div className='video-miniature'>
            <img src={uploadUrl + '/miniatures/' + props.miniature} />
            <h2>{props.title}</h2>
            <h1>{props.views}</h1>
        </div>
    );
}

export default VideoMiniature;
