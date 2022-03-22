import { Link } from "react-router-dom";
import "./Auth.scss";

const Login = () => {
    return (
        <div className="auth-container">
            <form>
                <h4>User Login</h4>
                <input className="input" name="username" type="text" placeholder="username" />
                <input className="input" name="password" type="text" placeholder="password" />
                <div className="auth-btn-wrap">
                    <Link to="/register">No registration?</Link>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;