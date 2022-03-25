import "./Results.scss";
import Search from "../Search/Search";
import Card from "../Card/Card";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getMovieByTitle } from "../../services/openApiServices";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../../features/user/moviesSlice";

const Results = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    let filmTitle = location.search.split('=')[1];

    useEffect(() => {
        getMovieByTitle(filmTitle)
            .then(res => dispatch(addMovies(res.results)))
            .catch(err => console.log(err))
    }, [location])

    return (
        <div className="results-container">
            <Search />
            <Card details={false}/>
        </div>
    );
}

export default Results;