import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from '../features/user/userSlice';

const LoggedUserGuard = () => {
    const dispatch = useDispatch();
    const user = dispatch(getUser());
    
    if (user.payload.isLogged) {
        return <Navigate to='/' replace />;
    } else {
        return <Outlet />
    }
}

export default LoggedUserGuard;