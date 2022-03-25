import "./Card.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Card = ({ details }) => {
    const searchedMovies = useSelector(state => state.movies.value.searchedMovies);
    const movieDetails = useSelector(state => state.movies.value.movieDetails);

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
                <button>Add to favourite</button>
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