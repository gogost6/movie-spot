import "./Details.scss";
import Card from "../Card/Card.js";

const Details = () => {
    return (
        <div style={{ margin: '5% 10%' }}>
            <Card />
            <div className="review">
                <h2>Your Review</h2>
                <h1>* * * * *</h1>
                <textarea name="review" id="review" cols="60" rows="10"></textarea>
            </div>
        </div>
    );
}

export default Details;