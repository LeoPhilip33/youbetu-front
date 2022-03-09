
function UserInfo() {


    return (
        <div className='user-info-container'>
            <button onClick={() => delete localStorage.token && delete localStorage.userId} >Se déconnecter</button>
        </div>
    );
}

export default UserInfo;
