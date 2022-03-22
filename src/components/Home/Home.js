import "./Home.scss";

const Home = () => {
    
    const onClick = (e) => {
        e.preventDefault();
        document.body.scrollTop = 452;
        document.documentElement.scrollTop = 452;
    }

    return (
        <>
            <div className="home">
                <button className="btn" onClick={onClick}>Go to favourites</button>
            </div>
            <div className="favorites-container">
                <h2>My Favorites</h2>
                <div className="img-container">
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                    <img width="200px" height="200px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CBGvX0Yqcc7nWM3hxqhQGQHaEo%26pid%3DApi&f=1" alt="img" />
                </div>
            </div>
        </>
    );
}

export default Home;