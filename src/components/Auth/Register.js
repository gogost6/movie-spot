import { Link } from "react-router-dom";
import "./Auth.scss";

const Register = () => {
    return (
        <div className="auth-container">
            <form>
                <h4>User Register</h4>
                <input className="input" name="username" type="text" placeholder="username" />
                <input className="input" name="password" type="text" placeholder="password" />
                <input className="input" name="repeat-password" type="text" placeholder="repeat-password" />
                <div className="auth-btn-wrap">
                    <Link to="/login">Login?</Link>
                    <button>Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;