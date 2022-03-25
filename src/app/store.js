import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../features/user/moviesSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesSlice
    },
})