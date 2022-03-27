import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.scss";
import { pushMovie, userAuthentication } from "../../features/user/userSlice";
import { loginUser } from "../../services/authServices";
import { useState } from "react";
import { addMovie } from "../../services/moviesServices";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const user = JSON.parse(localStorage.getItem('user'));

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);

        loginUser(data)
            .then(res => {
                if (user._id === "" && user.movies.length > 0 && res._id !== "") {
                    let notInProfileMoviesArr = [];

                    for (let index = 0; index < user.movies.length; index++) {
                        const movieInLocal = user.movies[index];
                        const foundedInDBIndex = res.movies.findIndex(x => x.name === movieInLocal.name);

                        if (foundedInDBIndex === -1) {
                            notInProfileMoviesArr.push(movieInLocal);
                        } 
                    }

                    dispatch(userAuthentication(res));

                    if (notInProfileMoviesArr.length > 0) {
                        notInProfileMoviesArr.forEach(x => {
                            addMovie({email: res.email, ...x})
                                .then(resp => console.log(resp))
                                .catch(error => console.log(error))
                            dispatch(pushMovie(x))   
                        })
                    }
                } else {
                    dispatch(userAuthentication(res));
                }
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
                {error ? <p className="error hide" style={{ color: 'red' }}>Wrong username or password</p> : ''}
            </form>
        </div>
    );
}

export default Login;