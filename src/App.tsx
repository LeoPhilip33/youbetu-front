import './App.css';
import LateralNavbar from './components/LateralNavbar/LateralNavbar';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import UploadVideo from './pages/UploadVideo/UploadVideo';

function App() {



	return (


		<Router>
			<div className='container'></div>
			<Navbar />
			<div className='flex-container-navbar'>
				<LateralNavbar />
				<div className='container-app'>

					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/register" element={<Register />}></Route>
						<Route path="/upload-video" element={<UploadVideo />}></Route>
					</Routes>
				</div >
			</div >
		</Router >
	);
}

export default App;
