import axios from "axios"
import React, { useContext, useState } from "react"
import url from "../../config"
import './Auth.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BrowserRouter as Redirect, Router, Route, Routes } from "react-router-dom"
import LateralNavbar from "../../components/LateralNavbar/LateralNavbar"
import { UserContext } from "../../UserContext"

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


interface Istate {
    name: string;
    email: string;
    photo: any;
    password: string;
    password_confirmation: string;

}

function Register() {

    const [state, setState] = useState<Istate>({
        name: '',
        email: '',
        photo: null,
        password: '',
        password_confirmation: '',
    })

    const [isLogged, setIsLogged] = useContext(UserContext);

    const handleChangeName = (e: { target: { value: any } }) => {
        setState({
            name: e.target.value,
            email: state.email,
            photo: state.photo,
            password: state.password,
            password_confirmation: state.password_confirmation,
        })
    }
    const handleChangeEmail = (e: { target: { value: any } }) => {
        setState({
            name: state.name,
            email: e.target.value,
            photo: state.photo,
            password: state.password,
            password_confirmation: state.password_confirmation,
        })
    }
    const handleChangePassword = (e: { target: { value: any } }) => {
        setState({
            name: state.name,
            email: state.email,
            photo: state.photo,
            password: e.target.value,
            password_confirmation: state.password_confirmation,
        })
    }
    const handleChangePasswordConfirmation = (e: { target: { value: any } }) => {
        setState({
            name: state.name,
            email: state.email,
            photo: state.photo,
            password: state.password,
            password_confirmation: e.target.value,
        })
    }

    const handleChangePhoto = (e: any) => {
        setState({
            name: state.name,
            email: state.email,
            photo: e.target.files[0],
            password: state.password,
            password_confirmation: state.password_confirmation,
        })
    }



    const handleSubmit = (e: { preventDefault: VoidFunction }) => {

        e.preventDefault();
        const data = new FormData()


        data.append('name', state.name)
        data.append('email', state.email)
        data.append('photo', state.photo)
        data.append('password', state.password)
        data.append('password_confirmation', state.password_confirmation)

        axios.post(`${url}/register`, data)
            .then((res) => {
                localStorage.token = res.data[2]
                localStorage.userId = res.data[0].id
                setIsLogged(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <div className="auth-container" >
            <LateralNavbar />
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
                <h1 className="title-auth"> Connectez-vous !</h1>
                <div className="label-input-container">
                    <input className="input-auth" placeholder="name" type="text" name="name" onChange={handleChangeName} value={state.name} />
                </div>
                <div className="label-input-container">
                    <input className="input-auth" placeholder="email" type="email" name="email" onChange={handleChangeEmail} value={state.email} />
                </div>
                <div className="label-input-container">
                    <label> Ajouter une photo :</label> <br />
                    <input className='input-auth' type="file" name="photo" onChange={handleChangePhoto} />
                </div>
                <div className="label-input-container">
                    <input className="input-auth" placeholder="Password" type="password" name="password" onChange={handleChangePassword} value={state.password} />
                </div>
                <div className="label-input-container">
                    <input className="input-auth" placeholder="Confirme le password" type="password" name="passwordConfirmation" onChange={handleChangePasswordConfirmation} value={state.password_confirmation} />
                </div>
                <div className="btn-add-account">
                    <button className='ajouter-compte' type="submit"> Ajouter </button>
                </div>
                <p className="no-account">Déjà un compte ? <Link to='/login' className="register-link">Connecte toi</Link></p>
            </form>
            {isLogged ?
                <Navigate to={{ pathname: "/" }} />
                : ''}

        </div >
    )
}



export default Register
