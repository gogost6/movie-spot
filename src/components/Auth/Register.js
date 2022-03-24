import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userAuthentication } from "../../features/user/userSlice";
import { usedEmail, usedUsername, registerUser } from "../../services/authServices";
import "./Auth.scss";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let [isSubmitted, setIsSubmitted] = useState(false);
    let [username, setUsername] = useState('');
    let [usedUsernameState, setUsedUsernameState] = useState(false);
    let [usedEmailState, setUsedEmailState] = useState(false);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [repeatPassword, setRepeatPassword] = useState('');

    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);

        if (data.username.length > 4) {
            usedUsername(data.username)
                .then(res => setUsedUsernameState(res))
                .catch(err => console.log(err))
        }

        if (emailRegex.test(data.email)) {
            usedEmail(data.email)
                .then(res => setUsedEmailState(res))
                .catch(err => console.log(err))
        }

        registerUser(data)
            .then(res => {
                dispatch(userAuthentication(res));
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h4>User Register</h4>
                <input className="input" name="email" type="text"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />
                {email === '' && isSubmitted ? <p className="error">Email is empty!</p> : ''}
                {!emailRegex.test(email) && isSubmitted ? <p className="error">Email is invalid!</p> : ''}
                {usedEmailState ? <p className="error">Email is used by other user!</p> : ''}
                <input className="input" name="username" type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }} />
                {username === '' && isSubmitted ? <p className="error">Username is empty!</p> : ''}
                {username.length < 5 && isSubmitted ? <p className="error">Username should be atleast 5 symbols!</p> : ''}
                {usedUsernameState ? <p className="error">Username is used by other user!</p> : ''}
                <input className="input" name="password" type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }} />
                {password === '' && isSubmitted ? <p className="error">Password is empty!</p> : ''}
                {password.length < 4 && isSubmitted ? <p className="error">Password should be atleast 4 symbols!</p> : ''}
                <input className="input" name="repassword" type="password"
                    placeholder="repeat password"
                    value={repeatPassword}
                    onChange={(e) => { setRepeatPassword(e.target.value) }} />
                {repeatPassword === '' && isSubmitted ? <p className="error">Repeat password is empty!</p> : ''}
                {password !== repeatPassword && isSubmitted ? <p className="error">Password and repeat password don't match!</p> : ''}
                <div className="auth-btn-wrap">
                    <Link to="/login">Login?</Link>
                    <button>Register</button>
                </div>
                <p className="warning">*username should be atleast 5 symbols</p>
                <p className="warning">*password should be atleast 4 symbols</p>
            </form>
        </div>
    );
}

export default Register;