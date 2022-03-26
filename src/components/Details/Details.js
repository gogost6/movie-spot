import "./Details.scss";
import Card from "../Card/Card.js";
import { useSelector } from "react-redux";

const Details = () => {
    const user = useSelector(state => state.user.value);
    const movieDetails = useSelector(state => state.movies.value.movieDetails);

    return (
        <div style={{ margin: '5% 10%' }}>
            <Card details={true} />
        </div>
    );
}

export default Details;