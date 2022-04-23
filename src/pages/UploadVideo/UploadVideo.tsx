
import './UploadVideo.scss';
import React from "react";
import url from "../../config";
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom'
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
        user_id: null,
        isPublied: false,
        error: ''
    };



    handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();

        const data = new FormData()


        data.append('title', this.state.title)
        data.append('description', this.state.description)
        data.append('miniature', this.state.miniature)
        data.append('video', this.state.video)
        data.append('user_id', localStorage.userId)



        authenticatedFetch('POST', `/videos`, data)
            .then((res) => {
                localStorage.token = res.data[2]
                this.setState({
                    isPublied: true
                })
            }).catch((error) => {
                this.setState({
                    error: 'Remplir les champs manquants lo'
                })
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
            <div className='container-import-video'>
                <LateralNavbar />
                <div className='container-import-video-modifications'>
                    <h1 className='title-import-video'>Importer des vidéos</h1>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className='titre-upload'>
                            <input className='titre-input-upload' type="text" placeholder='Titre' name="titre" onChange={this.handleChangeTitle} />
                        </div>
                        <div className='titre-upload'>
                            <textarea className='textarea-input-upload' name="description" placeholder='Description' onChange={this.handleChangeDescription} ></textarea>
                        </div>
                        <div className='flex-uploads'>
                            <div>
                                <div> <label className='title-upload'>Uploader votre vidéo :</label> </div>
                                <div> <input type="file" name="video" onChange={this.handleChangeVideo} /> </div>
                            </div>
                            <div>
                                <div> <label className='title-upload'> Miniature de la vidéo :</label> </div>
                                <div> <input type="file" name="miniature" onChange={this.handleChangeMiniature} /> </div>
                            </div>
                        </div>
                        <div className='container-btn-upload'>
                            <button className='submit-btn-upload' type="submit"> Enregistrer la vidéo </button>
                        </div>
                        <p className='error-msg'> {this.state.error}</p>
                    </form>
                </div>
                {this.state.isPublied == true ?
                    <Navigate to={{ pathname: "/" }} />
                    : 'aaaaaa'}
            </div >
        );
    }
}


export default Register
