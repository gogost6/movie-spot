import "./Search.scss";

const Search = () => {
    return (
        <div className="search-container">
            <input className="input" type="text" placeholder="Search by movie title..."/>
            <button>Search</button>
        </div>
    );
}

export default Search;