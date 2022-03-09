import axios from "axios"
import React, { useState } from "react"
import url from "../../config"
import './Auth.scss'
import LateralNavbar from "../../components/LateralNavbar/LateralNavbar";

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
            <form onSubmit={handleSubmit}>

                <div className="label-input-container">

                    <label> email:</label>
                    <input type="email" name="email" value={state.email} onChange={handleChangeEmail} />
                </div>
                <div className="label-input-container">

                    <label> password:</label>
                    <input type="password" name="password" value={state.password} onChange={handleChangePassword} />
                </div>
                <button className='ajouter-compter' type="submit"> Valider </button>
            </form>

        </div >
    )
}





export default Login;
