import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Results from './components/Results/Results';
import Details from './components/Details/Details';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/search' element={<Results/>}/>
        <Route path='/movies/*' element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
