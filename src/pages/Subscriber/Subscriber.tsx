
import './Subscriber.scss';
import VideoMiniature from '../../components/Video/VideoMiniature';
import React from "react";
import axios from 'axios'
import url from '../../config';
import LateralNavbar from '../../components/LateralNavbar/LateralNavbar';
import { useSelector } from 'react-redux';
import Sub from '../../components/Sub/Sub';

function Subscriber() {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        axios.get(`${url}/subs/${localStorage.userId}`)
            .then((res) => {
                setUsers(res.data);
            })
    }, []);
    return (
        <div className='home-page'>

            <LateralNavbar />

            <section className='sub-container'>
                {users.map((user, index) => {
                    return <Sub key={index} {...user} />
                })}
            </section>
        </div>
    );
}

export default Subscriber;
