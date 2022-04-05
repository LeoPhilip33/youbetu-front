
import './Sub.scss';

import url, { uploadUrl } from '../../config';

function Sub(props: any) {

    return (
        <div className='sub'>
            <img src={uploadUrl + '/photos/' + props.photo} alt="" />
            <p>{props.name}</p>
            <p>{props.subscriber}</p>
        </div>
    );
}

export default Sub;
