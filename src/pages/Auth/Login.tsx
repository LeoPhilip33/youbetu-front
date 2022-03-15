import axios from "axios"
import React, { useState } from "react"
import url from "../../config"
import './Auth.scss'
import LateralNavbar from "../../components/LateralNavbar/LateralNavbar";
import { Link } from "react-router-dom";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


interface Istate {
    email: string;
    password: string;
}

function Login() {
    const [state, setState] = useState<Istate>({
        email: '',
        password: '',
    })

    const handleChangeEmail = (e: { target: { value: any } }) => {
        setState({
            email: e.target.value,
            password: state.password,
        })
    }

    const handleChangePassword = (e: { target: { value: any } }) => {
        setState({
            email: state.email,
            password: e.target.value,
        })
    }

    const handleSubmit = (e: { preventDefault: VoidFunction }) => {

        e.preventDefault();

        axios.post(`${url}/login`, state)
            .then((res) => {
                localStorage.token = res.data[2]
                localStorage.userId = res.data[0].id
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className="auth-container" >
            <LateralNavbar />
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="title-auth"> Connectez-vous !</h1>
                <div className="container-form">
                    <div className="label-input-container">
                        <input className="input-auth" placeholder="Adresse e-mail" type="email" name="email" value={state.email} onChange={handleChangeEmail} />
                    </div>
                    <div className="label-input-container">
                        <input className="input-auth" placeholder="Saisissez votre mot de passe" type="password" name="password" value={state.password} onChange={handleChangePassword} />
                    </div>
                    <div className="btn-add-account">
                        <button className='ajouter-compte' type="submit"> Valider </button>
                    </div>
                    <p className="no-account">Pas de compte ? <Link to='/register' className="register-link">Créer un compte</Link></p>
                </div>
            </form>

        </div >
    )
}





export default Login;
