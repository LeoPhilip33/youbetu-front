
import './Comment.scss';
import url, { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import React from 'react';
import axios from 'axios';

function Comment(props: any) {



    const [user, setUser] = React.useState({
        name: '',
        photo: ''
    })

    React.useEffect(() => {
        console.log(props.user_id)
        axios.get(`${url}/user/${props.user_id}`)
            .then((res) => {
                setUser(res.data);
                console.log(res.data)
            })
    }, []);

    return (
        <div className='comment-container'>
            <img className='comment-photo' src={uploadUrl + '/photos/' + user.photo} alt="" />
            <div className='user-comment-info-container'>
                <div className='user-info-container'>
                    <p>{user.name}</p>
                    <p>{props.created_at.substring(0, 10)}</p>
                </div>
                <p className='comment'>{props.comment}</p>
            </div>
        </div>
    );
}

export default Comment;
