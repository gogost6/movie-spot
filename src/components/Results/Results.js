import "./Results.scss";
import Search from "../Search/Search";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieByTitle } from "../../services/openApiServices";
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

    }, [location, user.movies])

    const addToFavoriteBtn = (e, movie) => {
        e.preventDefault();
        const foundedIndex = user.movies.findIndex(x => x.name == movie.original_title);
        if (foundedIndex !== -1) {
            favoriteAdd({ email: user.email, name: movie.original_title })
                .then(res => console.log(res))
                .catch(err => console.log(err));

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

            addMovie({ email: user.email, ...reqData })
                .then(res => console.log(res))
                .catch(err => console.log(err));

            dispatch(pushMovie(reqData))
        }
    }

    const removeFromFavoriteBtn = (e, name) => {
        const foundedIndex = user.movies.findIndex(x => x.name == name);

        favoriteRemove({ email: user.email, name })
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
                    <h2>{x.original_title} ({x.release_date.split('-')[0]})</h2>
                    <p>{x.overview.substr(0, 520)}...</p>
                    <Link to={`/movies/${x.id}`}>Link to details</Link>
                    {x.favorite
                        ? <button onClick={e => removeFromFavoriteBtn(e, x.original_title)} >Remove from favourite</button>
                        : <button onClick={e => addToFavoriteBtn(e, x)} >Add to favourite</button>}
                </div>
            </div>)}
        </div>
    } else {
        return (<p>Error</p>);
    }
}

export default Results;