import { useContext } from "react";
import { UserContext } from "../../UserContext";

function UserInfo() {

    const [isLogged, setIsLogged] = useContext(UserContext);

    return (
        <div className='user-info-container'>
            <button onClick={() => delete localStorage.token && delete localStorage.userId && setIsLogged(false)} >Se déconnecter</button>
        </div>
    );
}

export default UserInfo;
