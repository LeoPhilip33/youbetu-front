import axios from "axios";
import React from "react";
import url from "../../config";
import './Auth.scss';
import './Register.scss'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Redirect, Router, Route, Routes } from "react-router-dom"

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class Register extends React.Component {
    constructor(props: any) {
        super(props);
    }
    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };
    handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }
        axios.post(`${url}/register`, user).then((res) => {
            console.log(res.data)
            localStorage.token = res.data[2]
            localStorage.userId = res.data[0].id
            let navigate = useNavigate()
            navigate("/home")
        }).catch((error) => {
            console.error(error)
        })

    }
    handleChangeName = (event: { target: { value: any; }; }) => {
        this.setState(
            {
                name: event.target.value,
            }
        );
    }
    handleChangeEmail = (event: { target: { value: any; }; }) => {
        this.setState(
            {
                email: event.target.value,
            }
        );
    }
    handleChangePassword = (event: { target: { value: any; }; }) => {
        this.setState(
            {
                password: event.target.value,
            }
        );
    }
    handleChangePasswordConfirmation = (event: { target: { value: any; }; }) => {
        this.setState(
            {
                password_confirmation: event.target.value,
            }
        );
    }

    render() {
        return (
            <div className="auth-container" >
                <form onSubmit={this.handleSubmit}>
                    <div className="label-input-container">
                        <label> name:</label>
                        <input type="text" name="name" onChange={this.handleChangeName} />
                    </div>
                    <div className="label-input-container">

                        <label> email:</label>
                        <input type="email" name="email" onChange={this.handleChangeEmail} />
                    </div>
                    <div className="label-input-container">

                        <label> password:</label>
                        <input type="password" name="password" onChange={this.handleChangePassword} />
                    </div>
                    <div className="label-input-container">

                        <label> Confirme le password:</label>
                        <input type="password" name="passwordConfirmation" onChange={this.handleChangePasswordConfirmation} />

                        <button className='ajouter-compter' type="submit"> Ajouter </button>
                    </div>
                </form>

            </div >
        );
    }
}


export default Register
