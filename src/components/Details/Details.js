import "../Results/Results.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pushMovie, addFavoriteRedux, removeFavoriteRedux, addRatingRedux, addNotesRedux } from "../../features/user/userSlice";
import { addMovie, favoriteAdd, favoriteRemove, notesAdd, ratingsAdd } from "../../services/moviesServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { getMovieDetails } from "../../services/openApiServices";
import { addMovieDetails } from "../../features/movies/moviesSlice";

const Details = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    const movieDetails = useSelector(state => state.movies.value.movieDetails);
    const [movieRating, setMovieRating] = useState(0);
    const [isFavoriteState, setIsFavoriteState] = useState(false);
    const [isMovieInProfile, setIsMovieInProfile] = useState(false);
    const [notes, setNotes] = useState('');
    const foundedFilm = user.movies.find(x => x.name === movieDetails.original_title);
    const id = location.pathname.split('/')[2];
    const index = user.movies.findIndex(x => x.name == movieDetails.original_title);

    useEffect(() => {
        getMovieDetails(id)
            .then(res => dispatch(addMovieDetails(res)))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (foundedFilm) {
            setMovieRating(foundedFilm.rating);
            foundedFilm.favorite == true ? setIsFavoriteState(true) : setIsFavoriteState(false);
            setNotes(foundedFilm.notes);
            setIsMovieInProfile(true);
        } else {
            setMovieRating(0);
            setIsFavoriteState(false);
            setNotes('');
            setIsMovieInProfile(false);
        }
    }, [user.movies, foundedFilm, movieDetails.original_title]);

    const resetBtn = (e) => {
        e.preventDefault();
        setNotes('');

        if (user._id !== '') {
            notesAdd({ email: user.email, name: movieDetails.original_title, notes: '' })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

        dispatch(addNotesRedux({ index, notes: '' }))
    }

    const onNotesSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let notes = Object.fromEntries(formData).notes;

        const reqData = {
            email: user.email,
            name: movieDetails.original_title,
            rating: 0,
            favorite: false,
            notes,
            poster_path: movieDetails.poster_path,
            id: movieDetails.id
        }

        if (!isMovieInProfile) {
            if (user._id !== '') {
                addMovie(reqData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }

            dispatch(pushMovie({
                name: movieDetails.original_title,
                rating: 0,
                favorite: false,
                notes,
                poster_path: movieDetails.poster_path,
                id: movieDetails.id
            }))
        } else {
            if (user._id !== '') {
                notesAdd({ email: user.email, name: movieDetails.original_title, notes })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
            dispatch(addNotesRedux({ index, notes }))
        }
    }

    const onStarClick = (e, rating) => {
        const reqData = {
            email: user.email,
            name: movieDetails.original_title,
            rating: rating,
            favorite: false,
            notes: '',
            poster_path: movieDetails.poster_path,
            id: movieDetails.id
        }

        if (!isMovieInProfile) {
            if (user._id !== '') {
                addMovie(reqData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }

            dispatch(pushMovie({
                name: movieDetails.original_title,
                rating: rating,
                favorite: false,
                notes: '',
                poster_path: movieDetails.poster_path,
                id: movieDetails.id
            }))
        } else {
            if (user._id !== '') {
                ratingsAdd({ email: user.email, name: movieDetails.original_title, rating })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
            dispatch(addRatingRedux({ index, rating }))
        }
    }

    const checkRating = (rating, number) => {
        if (rating >= number) {
            return "yellow";
        } else {
            return "white";
        }
    }

    const addToFavoriteBtn = (e, name) => {
        e.preventDefault();
        const reqData = {
            email: user.email,
            name,
            rating: 0,
            favorite: true,
            notes: '',
            poster_path: movieDetails.poster_path,
            id: movieDetails.id
        }

        if (!isMovieInProfile) {
            if (user._id !== '') {
                addMovie(reqData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }

            dispatch(pushMovie({
                name: movieDetails.original_title,
                rating: 0,
                favorite: true,
                notes: '',
                poster_path: movieDetails.poster_path,
                id: movieDetails.id
            }))
        } else {
            const foundedIndex = user.movies.findIndex(x => x.name == name);
            if (user._id !== '') {
                favoriteAdd({ email: user.email, name })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }

            dispatch(addFavoriteRedux(foundedIndex));
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

    if (movieDetails.id) {
        let genres = movieDetails.genres.map(x => x.name).join(', ');

        return (<div style={{ margin: '5% 10%' }}>
            <div className="card-container">
                <div className="card" key={movieDetails.id}>
                    <Link to={`/movies/${movieDetails.id}`} className="card-img-wrap">
                        <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`} alt="img" />
                    </Link>
                    <div className="card-content">
                        <h2>{movieDetails.original_title} ({movieDetails.release_date.split('-')[0]})</h2>
                        <p>{genres} | {movieDetails.runtime} min</p>
                        <p>{movieDetails.overview.substr(0, 420)}...</p>
                        <a href={movieDetails.homepage} target="_blank">Visit official site</a>
                        {isFavoriteState
                            ? <button onClick={e => removeFromFavoriteBtn(e, movieDetails.original_title)}>Remove from favourite</button>
                            : <button onClick={e => addToFavoriteBtn(e, movieDetails.original_title)}>Add to favourite</button>}
                    </div>
                </div>
                <div className="review">
                    <h2>Your Review</h2>
                    <div className="stars-container">
                        <FontAwesomeIcon onClick={e => onStarClick(e, 1)} icon={solid('Star')} size="xl" color={checkRating(movieRating, 1)} stroke="#000000" fill="black" strokeWidth={28} cursor="pointer" />
                        <FontAwesomeIcon onClick={e => onStarClick(e, 2)} icon={solid('Star')} size="xl" color={checkRating(movieRating, 2)} stroke="#000000" fill="black" strokeWidth={28} cursor="pointer" />
                        <FontAwesomeIcon onClick={e => onStarClick(e, 3)} icon={solid('Star')} size="xl" color={checkRating(movieRating, 3)} stroke="#000000" fill="black" strokeWidth={28} cursor="pointer" />
                        <FontAwesomeIcon onClick={e => onStarClick(e, 4)} icon={solid('Star')} size="xl" color={checkRating(movieRating, 4)} stroke="#000000" fill="black" strokeWidth={28} cursor="pointer" />
                        <FontAwesomeIcon onClick={e => onStarClick(e, 5)} icon={solid('Star')} size="xl" color={checkRating(movieRating, 5)} stroke="#000000" fill="black" strokeWidth={28} cursor="pointer" />
                    </div>
                    <form className="notes-form" onSubmit={onNotesSubmit}>
                        <textarea name="notes" id="notes" cols="60"
                            rows="10" value={notes}
                            onChange={e => setNotes(e.target.value)}></textarea>
                        <div className="notes-btn-wrap">
                            <button>Submit</button>
                            <button onClick={resetBtn}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
    } else {
        return <p>Error</p>
    }
}

export default Details;