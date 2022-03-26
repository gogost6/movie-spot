import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../features/movies/moviesSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesSlice
    },
})