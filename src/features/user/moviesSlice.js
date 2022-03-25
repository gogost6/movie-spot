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
        movieDetails: {
            
        }
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
        }
    }
});

export const { addMovies, addMovieDetails } = moviesSlice.actions;

export default moviesSlice.reducer;