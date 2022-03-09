import './App.css'
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

function App() {



	return (

		<Router>
			<Provider store={store}>
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
						</Routes>
					</div >
				</div >
			</Provider>
		</Router >
	);
}

export default App;
