import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Results from './components/Results/Results';
import Details from './components/Details/Details';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './services/authServices';
import { userAuthentication } from './features/user/userSlice';
import LoggedUserGuard from './guards/LoggedUserGuard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUser()
      .then(res => {
        console.log(res);
        dispatch(userAuthentication(res));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<LoggedUserGuard />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/search' element={<Results />} />
        <Route path='/movies/*' element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
