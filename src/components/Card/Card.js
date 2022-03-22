import "./Card.scss";
import { Link } from "react-router-dom";

const Card = () => {
    return (
        <div className="card">
            <div className="card-img-wrap">
                <img src="" alt="img" />
            </div>
            <div className="card-content">
                <h2>Fast and furious</h2>
                <p>Drama, Thriller, Comedy | 90 minutes</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati eum eos voluptatibus fugiat maiores neque
                    fugit consequuntur expedita commodi atque tempora mollitia
                    assumenda recusandae autem eaque quam necessitatibus, cupiditate nihil?
                </p>
                <Link to='/movies/ffs'>Link to details</Link>
                <button>Add to favourite</button>
            </div>
        </div>
    );
}

export default Card;