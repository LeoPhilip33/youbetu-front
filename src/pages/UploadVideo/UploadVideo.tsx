
import './UploadVideo.scss';
import React from "react";
import url from "../../config";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { getUserId, authenticatedFetch } from '../../utils'
import LateralNavbar from '../../components/LateralNavbar/LateralNavbar';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class Register extends React.Component {
    constructor(props: any) {
        super(props);
    }
    state = {
        title: '',
        description: '',
        miniature: '',
        video: '',
        user_id: null
    };

    handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();

        const data = new FormData()


        data.append('title', this.state.title)
        data.append('description', this.state.description)
        data.append('miniature', this.state.miniature)
        data.append('video', this.state.video)
        data.append('user_id', localStorage.userId)

        axios.post(`${url}/videos`, data).then((res) => {
            console.log(res.data)
            localStorage.token = res.data[2]
            let navigate = useNavigate()
            navigate("/home")
        }).catch((error) => {
            console.error(error)
        })




    }
    handleChangeTitle = (event: { target: { value: any; }; }) => {
        this.setState(
            {
                title: event.target.value,
            }
        );
    }
    handleChangeDescription = (event: { target: { value: any; }; }) => {
        this.setState(
            {
                description: event.target.value,
            }
        );
    }
    handleChangeVideo = (e: any) => {
        this.setState({
            video: e.target.files[0]
        })
    }

    handleChangeMiniature = (e: any) => {
        this.setState({
            miniature: e.target.files[0]
        })
    }


    render() {
        return (
            <div className="auth-container" >
                <LateralNavbar />
                <h1>Upload video</h1>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className="label-input-container">
                        <label> titre:</label>
                        <input type="text" name="titre" onChange={this.handleChangeTitle} />
                    </div>
                    <div className="label-input-container">

                        <label> description:</label>
                        <textarea name="description" onChange={this.handleChangeDescription} > </textarea>
                    </div>
                    <div className="label-input-container">

                        <label> video:</label>
                        <input type="file" name="video" onChange={this.handleChangeVideo} />
                    </div>
                    <div className="label-input-container">

                        <label> miniature:</label>
                        <input type="file" name="miniature" onChange={this.handleChangeMiniature} />

                        <button type="submit"> Add </button>
                    </div>
                </form>

            </div >
        );
    }
}


export default Register
