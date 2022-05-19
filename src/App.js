import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
