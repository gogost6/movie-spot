import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addPopular } from "../../features/user/moviesSlice";
import { getPopular } from "../../services/openApiServices";
import "./Home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(state => state.movies.value.popularMovies);

    useEffect(() => {
        getPopular()
            .then(res => dispatch(addPopular(res.results.slice(0, 4))))
            .catch(err => console.log(err))
    }, [])

    const onClick = (e) => {
        e.preventDefault();
        document.body.scrollTop = 452;
        document.documentElement.scrollTop = 452;
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
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                </div>
            </div>
        </>
    );
}

export default Home;