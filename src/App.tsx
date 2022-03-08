import './App.css';
import LateralNavbar from './components/lateral-navbar/LateralNavbar';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';

function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <LateralNavbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
