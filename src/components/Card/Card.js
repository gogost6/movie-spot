import "./Card.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteAndPushRedux, addFavoriteRedux, removeFavoriteRedux, userAuthentication } from "../../features/user/userSlice";
import { addMovie, favoriteAdd, favoriteRemove } from "../../services/moviesServices";
import { useEffect, useState } from "react";

const Card = ({ details }) => {
    const dispatch = useDispatch();
    const searchedMovies = useSelector(state => state.movies.value.searchedMovies);
    const movieDetails = useSelector(state => state.movies.value.movieDetails);
    const user = useSelector(state => state.user.value);
    const [isFavoriteState, setIsFavoriteState] = useState(false);
    const [isMovieInProfile, setIsMovieInProfile] = useState(false);
    const foundedFilm = user.movies.find(x => x.name === movieDetails.original_title);

    useEffect(() => {
        if (foundedFilm) {
            console.log(foundedFilm.favorite);
            foundedFilm.favorite == true ? setIsFavoriteState(true) : setIsFavoriteState(false);
            setIsMovieInProfile(true);
        } else {
            setIsMovieInProfile(false);
        }
    }, [user.movies, foundedFilm]);

    const addToFavoriteBtn = (e, name) => {
        e.preventDefault();
        const reqData = {
            email: user.email,
            name,
            rating: 0,
            favorite: true,
            notes: ''
        }

        if (!isMovieInProfile) {
            addMovie(reqData)
                .then(res => console.log(res))
                .catch(err => console.log(err));

            dispatch(addFavoriteAndPushRedux({
                name: movieDetails.original_title,
                rating: 0,
                favorite: true,
                notes: ''
            }))
        } else {
            const foundedIndex = user.movies.findIndex(x => x.name == name);
            favoriteAdd({ email: user.email, name })
                .then(res => console.log(res))
                .catch(err => console.log(err));

            dispatch(addFavoriteRedux(foundedIndex));
        }
    }

    const removeFromFavoriteBtn = (e, name) => {
        const foundedIndex = user.movies.findIndex(x => x.name == name);

        favoriteRemove({ email: user.email, name })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        dispatch(removeFavoriteRedux(foundedIndex));
    }

    if (details && movieDetails.id) {
        let genres = movieDetails.genres.map(x => x.name).join(', ');

        return (<div className="card" key={movieDetails.id}>
            <Link to={`/movies/${movieDetails.id}`} className="card-img-wrap">
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`} alt="img" />
            </Link>
            <div className="card-content">
                <h2>{movieDetails.original_title} ({movieDetails.release_date.split('-')[0]})</h2>
                <p>{genres} | {movieDetails.runtime} min</p>
                <p>{movieDetails.overview}</p>
                <a href={movieDetails.homepage} target="_blank">Visit official site</a>
                {isFavoriteState
                    ? <button onClick={e => removeFromFavoriteBtn(e, movieDetails.original_title)}>Remove from favourite</button>
                    : <button onClick={e => addToFavoriteBtn(e, movieDetails.original_title)}>Add to favourite</button>}
            </div>
        </div>)
    } else {
        if (searchedMovies.length > 0) {
            return searchedMovies.map(x => <div className="card" key={x.id}>
                <Link to={`/movies/${x.id}`} className="card-img-wrap">
                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${x.poster_path}`} alt="img" />
                </Link>
                <div className="card-content">
                    <h2>{x.original_title} ({x.release_date.split('-')[0]})</h2>
                    <p>{x.overview}</p>
                    <Link to={`/movies/${x.id}`}>Link to details</Link>
                    <button>Add to favourite</button>
                </div>
            </div>)
        } else {
            return '';
        }
    }
}

export default Card;