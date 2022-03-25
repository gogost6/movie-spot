import "./Details.scss";
import Card from "../Card/Card.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getMovieDetails } from "../../services/openApiServices";
import { useDispatch } from "react-redux";
import { addMovieDetails } from "../../features/user/moviesSlice";

const Details = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const id = location.pathname.split('/')[2];
    
    useEffect(() => {
        getMovieDetails(id)
            .then(res => dispatch(addMovieDetails(res)))
            .catch(err => console.log(err))
    }, [id])
    
    return (
        <div style={{ margin: '5% 10%' }}>
            <Card details={true}/>
            <div className="review">
                <h2>Your Review</h2>
                <h1>* * * * *</h1>
                <textarea name="review" id="review" cols="60" rows="10"></textarea>
            </div>
        </div>
    );
}

export default Details;