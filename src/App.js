import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar';
import Logout from './component/logout';
import Login from './pages/Login';
import Mobil from './pages/Mobil';
import Mobil2 from './pages/Mobil2';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mobil' element={<Mobil />} />
        <Route path='/mobil2' element={<Mobil2/>}/>
      </Routes>
      <hr className='mx-2' />
      <h6 className='text-secondary text-center'>
        <strong>Created by Walyul'ahdi Maulana Ramadhan in 2022</strong>
      </h6>
      <br />
    </BrowserRouter>
  );
}

export default App;
