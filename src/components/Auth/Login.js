import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.scss";
import { userAuthentication } from "../../features/user/userSlice";
import { loginUser } from "../../services/authServices";
import { useState } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);

        loginUser(data)
            .then(res => {
                dispatch(userAuthentication(res));
                navigate('/');
            })
            .catch(err => {
                setError(err);
                console.log(err);
            })
    }

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h4>User Login</h4>
                <input className="input" name="username" type="text" placeholder="username" />
                <input className="input" name="password" type="password" placeholder="password" />
                <div className="auth-btn-wrap">
                    <Link to="/register">No registration?</Link>
                    <button>Login</button>
                </div>
                {error ? <p className="error hide" style={{color: 'red'}}>Wrong username or password</p> : ''}
            </form>
        </div>
    );
}

export default Login;