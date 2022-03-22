import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.scss";

const Header = () => {
    return (
        <ul className="header">
            <li>Movie Spot Logo</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li className="search-li"><Search /></li>
        </ul>
    );
}

export default Header;