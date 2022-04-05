
import './Sub.scss';

import url, { uploadUrl } from '../../config';
import { Link } from 'react-router-dom';

function Sub(props: any) {

    return (
        <Link to={`/profile/${props.id}`} className='sub' >
            <img src={uploadUrl + '/photos/' + props.photo} alt="" />
            <p>{props.name}</p>
            <p>{props.subscriber}</p>
        </Link>
    );
}

export default Sub;
