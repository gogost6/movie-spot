let baseUrl = 'http://www.omdbapi.com/?apikey=da80ad9b&';

export const getMovieByTitle = async (title) => {
    //title should have "+" not " "
    const response = await fetch(`${baseUrl}${title}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}