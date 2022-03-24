let baseUrl = '/api/movies';

export const addMovie = async (data) => {
    // in the data we need ---> email and name, rating, favorite, notes
    // WARNING ---> if movie is NOT in base and user ADDs movie to FAV 
    // we need to set favorite: true
    // or rating: 3
    // etc...

    const response = await fetch(`${baseUrl}/add-movie`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}

export const favoriteAdd = async (data) => {
    // we need email, name

    const response = await fetch(`${baseUrl}/favorites/add`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}

export const favoriteRemove = async (data) => {
    // we need email, name

    const response = await fetch(`${baseUrl}/favorites/add`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}


export const ratingsAdd = async (data) => {
    // we need email, name, rating

    const response = await fetch(`${baseUrl}/ratings/add`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}


export const notesAdd = async (data) => {
    // we need email, name, notes

    const response = await fetch(`${baseUrl}/notes/add`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}