import './App.scss'
import LateralNavbar from './components/LateralNavbar/LateralNavbar'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import UploadVideo from './pages/UploadVideo/UploadVideo'
import Video from './pages/Video/Video'
import { Provider } from 'react-redux';
import store from './store';
import { createContext, useState } from 'react'
import LikedVideo from './pages/LikedVideo/LikedVideo'
import Subscriber from './pages/Subscriber/Subscriber'
import Profile from './pages/Profile/Profile'
import { UserContext } from './UserContext';
import Dashboard from './pages/Dashboard/Dashboard'
function App() {

	const [isLogged, setIsLogged] = useState<boolean>(false);



	return (

		<Router>
			<UserContext.Provider value={[isLogged, setIsLogged]}>

				<div className='container'></div>
				<Navbar />
				<div className='flex-container-navbar'>
					<div className='container-app'>

						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/register" element={<Register />}></Route>
							<Route path="/login" element={<Login />}></Route>
							<Route path="/upload-video" element={<UploadVideo />}></Route>
							<Route path="/watch/:id" element={<Video />}></Route>
							<Route path="/liked-video" element={<LikedVideo />}></Route>
							<Route path="/subscriber" element={<Subscriber />}></Route>
							<Route path="/profile/:id" element={<Profile />}></Route>
							<Route path="/dashboard" element={<Dashboard />}></Route>
						</Routes>
					</div >
				</div >
			</UserContext.Provider>
		</Router >
	);
}

export default App;
