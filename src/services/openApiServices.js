export const getMovieByTitle = async (title) => {
    // title should have "+" not " "
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f6451d1e65623a59357d3ebb3f197431&query=${title}&page=1`, {
        method: 'GET',
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}

export const getMovieDetails = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f6451d1e65623a59357d3ebb3f197431`, {
        method: 'GET',
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}