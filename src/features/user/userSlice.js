import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    value: {
        _id: "",
        email: "",
        username: "",
        movies: [],
        isLogged: false,
        isAdmin: false
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getUser: (state, action) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user !== null && user.isLogged !== false) {
                state.value = user;
            } else if (user.isLogged === false) {
                action.payload = {
                    isLogged: false
                }
            }

            if (user !== null && user.isAdmin) {
                action.payload = {
                    isAdmin: true,
                    isLogged: true
                };
            } else if (user !== null && user.isLogged) {
                action.payload = {
                    isLogged: true
                };
            }
        },
        userAuthentication: (state, action) => {
            if (action.payload.isLogged === false) {
                state.value.isLogged = false;
            } else {
                state.value = action.payload;
                state.value.isLogged = true;
            }
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        userLogout: (state, action) => {
            state.value = initialState.value;
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        addFavoriteAndPushRedux: (state, action) => {
            state.value.movies.push(action.payload);
        },
        addFavoriteRedux: (state, action) => {
            const index = action.payload;
            state.value.movies[index].favorite = true;
        },
        removeFavoriteRedux: (state, action) => {
            const index = action.payload;
            state.value.movies[index].favorite = false;
        }
    }
});

export const { userAuthentication, userLogout, getUser, addFavoriteAndPushRedux, addFavoriteRedux, removeFavoriteRedux } = userSlice.actions;

export default userSlice.reducer;