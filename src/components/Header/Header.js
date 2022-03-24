import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../features/user/userSlice";
import { logoutHandled } from "../../services/authServices";
import Search from "../Search/Search";
import "./Header.scss";

const Header = () => {
    const user = useSelector(state => state.user.value);
    const dispatch = useDispatch();

    let logoutBtn = () => {
        logoutHandled().then(res => console.log(res)).catch(err => console.log(err));
        dispatch(userLogout());
    }

    return (
        <ul className="header">
            <li>Movie Spot Logo</li>
            <li><Link to="/">Home</Link></li>
            {user._id
                ? <li><Link onClick={logoutBtn} to="/">Logout</Link></li>
                : <><li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li></>}
            <li className="search-li"><Search /></li>
        </ul>
    );
}

export default Header;