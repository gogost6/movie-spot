import "./Header.scss";

const Header = () => {
    return (
        <ul>
            <li>Movie Spot Logo</li>
            <li><a href="/">Home</a></li>
            <li><a href="/favorites">Favorites</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>
    );
}

export default Header;