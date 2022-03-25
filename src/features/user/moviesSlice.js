import { createSlice } from '@reduxjs/toolkit';

//{
// title: "",
//     year: "",
//         genre: "",
//             runtime: "",
//                 description: "",
//                     image: "",
//                         website: ""
//         }
let initialState = {
    value: {
        searchedMovies: [],
        movieDetails: {},
        popularMovies: []
    }
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState: initialState,
    reducers: {
        addMovies: (state, action) => {
            state.value.searchedMovies = action.payload;
        },
        addMovieDetails: (state, action) => {
            state.value.movieDetails = action.payload;
        },
        addPopular: (state, action) => {
            state.value.popularMovies = action.payload;
        }
    }
});

export const { addMovies, addMovieDetails, addPopular } = moviesSlice.actions;

export default moviesSlice.reducer;