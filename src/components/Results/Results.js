import "./Results.scss";
import Search from "../Search/Search";
import Card from "../Card/Card";

const Results = () => {
    return (
        <div className="results-container">
            <Search />
            <Card />
            <Card />
            <Card />
        </div>
    );
}

export default Results;