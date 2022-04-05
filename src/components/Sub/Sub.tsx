
import './Sub.scss';

import url, { uploadUrl } from '../../config';
import { Link } from 'react-router-dom';

function Sub(props: any) {

    return (
        <Link to={`/profile/${props.user_id}`} className='sub' >
            <img src={uploadUrl + '/photos/' + props.photo} alt="" />
            <p>{props.name}</p>
            <p>{props.subscriber} abonnés</p>
        </Link>
    );
}

export default Sub;
