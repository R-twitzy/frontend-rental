import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar';
import Login from './pages/Login';
import Mobil from './pages/Mobil';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/mobil' element={<Mobil />} />
      </Routes>
      <hr className='mx-2'/>
      <h6 className='text-secondary text-center'>
        <strong>Created by Walyul'ahdi Maulana Ramadhan in 2022</strong>
      </h6>
      <br />
    </BrowserRouter>
  );
}

export default App;
