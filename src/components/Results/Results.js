import "./Results.scss";
import Search from "../Search/Search";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getMovieByTitle, getPopular } from "../../services/openApiServices";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../../features/movies/moviesSlice";
import { addMovie, favoriteAdd, favoriteRemove } from "../../services/moviesServices";
import { addFavoriteRedux, pushMovie, removeFavoriteRedux } from "../../features/user/userSlice";

const Results = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    let filmTitle = location.search.split('=')[1];
    const searchedMovies = useSelector(state => state.movies.value.searchedMovies);

    useEffect(() => {
        if (filmTitle !== '') {
            getMovieByTitle(filmTitle)
                .then(res => {
                    const newArray = res.results.map(x =>
                        user.movies.find(y =>
                            y.name === x.original_title && y.favorite === true)
                            ? { ...x, favorite: true }
                            : x)
                    dispatch(addMovies(newArray))
                })
                .catch(err => console.log(err));
        } else {
            getPopular()
                .then(res => {
                    const newArray = res.results.map(x =>
                        user.movies.find(y =>
                            y.name === x.original_title && y.favorite === true)
                            ? { ...x, favorite: true }
                            : x)
                    dispatch(addMovies(newArray))
                })
                .catch(err => console.log(err))
        }

    }, [location, user.movies])

    const addToFavoriteBtn = (e, movie) => {
        e.preventDefault();
        const foundedIndex = user.movies.findIndex(x => x.name == movie.original_title);
        if (foundedIndex !== -1) {
            if (user._id !== '') {
                favoriteAdd({ email: user.email, name: movie.original_title })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }

            dispatch(addFavoriteRedux(foundedIndex));
        } else {
            const reqData = {
                name: movie.original_title,
                rating: 0,
                favorite: true,
                notes: '',
                poster_path: movie.poster_path,
                id: movie.id
            }

            if (user._id !== '') {
                addMovie({ email: user.email, ...reqData })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }

            dispatch(pushMovie(reqData))
        }
    }

    const removeFromFavoriteBtn = (e, name) => {
        const foundedIndex = user.movies.findIndex(x => x.name == name);
        if (user._id !== '') {
            favoriteRemove({ email: user.email, name })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

        dispatch(removeFavoriteRedux(foundedIndex));
    }

    if (searchedMovies && searchedMovies.length > 0) {
        return <div className="results-container">
            <h1>Search</h1>
            <Search />
            {searchedMovies.map(x => <div className="card" key={x.id}>
                <Link to={`/movies/${x.id}`} className="card-img-wrap">
                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${x.poster_path}`} alt="img" />
                </Link>
                <div className="card-content">
                    <Link to={`/movies/${x.id}`} className="title-link">
                        <h2>{x.original_title} {x.release_date ? `(${x.release_date.split('-')[0]})` : ''}</h2>
                    </Link>
                    <p>{x.overview.substr(0, 420)}...</p>
                    <Link to={`/movies/${x.id}`}>Link to details</Link>
                    {x.favorite
                        ? <button onClick={e => removeFromFavoriteBtn(e, x.original_title)} >Remove from favourite</button>
                        : <button onClick={e => addToFavoriteBtn(e, x)} >Add to favourite</button>}
                </div>
            </div>)}
        </div>
    } else {
        return (
            <div className="results-container">
                <h1>Search</h1>
                <Search />
                <img className="error-img" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sitesbay.com%2Ffiles%2F404.gif&f=1&nofb=1" alt="" />
            </div>);
    }
}

export default Results;