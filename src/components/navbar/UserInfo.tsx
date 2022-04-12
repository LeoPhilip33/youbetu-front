import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

function UserInfo() {

    const [isLogged, setIsLogged] = useContext(UserContext);

    return (
        <div className='user-info-container'>
            <button onClick={() => delete localStorage.token && delete localStorage.userId && setIsLogged(false)} >Se déconnecter</button>
            <Link className='text-decoration-none-link' to="/dashboard">
                <p>Profile </p>
            </Link>
        </div>
    );
}

export default UserInfo;
