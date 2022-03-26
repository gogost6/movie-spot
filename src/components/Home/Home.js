import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addPopular } from "../../features/user/moviesSlice";
import { getPopular } from "../../services/openApiServices";
import "./Home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(state => state.movies.value.popularMovies);
    const userMovies = useSelector(state => state.user.value.movies);
    const favoriteOnly = userMovies.filter(x => x.favorite === true);

    useEffect(() => {
        getPopular()
            .then(res => dispatch(addPopular(res.results.slice(0, 4))))
            .catch(err => console.log(err))
    }, [])

    const onClick = (e) => {
        e.preventDefault();
        document.body.scrollTop = 510;
        document.documentElement.scrollTop = 510;
    }

    return (
        <>
            <div className="home">
                <button className="btn" onClick={onClick}>Go to favourites</button>
                <div className="popular-img-wrapper">
                    {popularMovies.length > 0
                        ? popularMovies.map(x => <Link key={x.id} to={`/movies/${x.id}`}><img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${x.poster_path}`} alt="img" /></Link>)
                        : ''}
                </div>
            </div>
            <div className="favorites-container">
                <h2>My Favorites</h2>
                <div className="img-container">
                    {favoriteOnly.length > 0
                        ? favoriteOnly.map(x =>
                            <Link to={`/movies/${x.id}`}>
                                <img key={x.id} width="200px" height="200px"
                                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${x.poster_path}`} />
                            </Link>)
                        : ''}
                </div>
            </div>
        </>
    );
}

export default Home;