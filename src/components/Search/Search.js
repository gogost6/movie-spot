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
    }, [location.search]);

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?name=${input}`);
    }

    return (
        <form className="search-container" onSubmit={onSubmit}>
            <input className="input" type="text"
                placeholder="Search by movie title..."
                value={input}
                name="title"
                onChange={(e) => { setInput(e.target.value) }} />
            <button>Search</button>
        </form>
    );
}

export default Search;