import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Search.scss";

const Search = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const location = useLocation();
    let filmTitle = location.search.split('=')[1] || '';

    useEffect(() => {
        let splited = filmTitle.split('%20');
        if (filmTitle !== '' && splited.length > 1) {
            let result = splited.join(' ');
            setInput(result);
        } else if (filmTitle !== '' && splited.length === 1) {
            setInput(filmTitle);
        }
    }, [location]);

    const onClick = (e) => {
        e.preventDefault()
        navigate(`/search?name=${input}`);
    }

    return (
        <div className="search-container">
            <input className="input" type="text"
                placeholder="Search by movie title..."
                value={input}
                onChange={(e) => { setInput(e.target.value) }} />
            <button onClick={onClick}>Search</button>
        </div>
    );
}

export default Search;