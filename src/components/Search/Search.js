import { useNavigate } from "react-router-dom";
import "./Search.scss";

const Search = () => {
    const navigate = useNavigate();

    const onClick = (e) => {
        e.preventDefault()
        navigate('/search');
    }

    return (
        <div className="search-container">
            <input className="input" type="text" placeholder="Search by movie title..."/>
            <button onClick={onClick}>Search</button>
        </div>
    );
}

export default Search;