import './App.css';
import LateralNavbar from './components/lateral-navbar/LateralNavbar';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className='container'>
        <Navbar />
        <LateralNavbar />
    </div>
  );
}

export default App;
