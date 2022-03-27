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
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        userAuthentication: (state, action) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (action.payload.isLogged === false) {
                state.value.isLogged = false;
            } else {
                state.value = action.payload;
                state.value.isLogged = true;
            }

            if(state.value._id === "" && user._id === "" && user.movies.length > 0) {
                state.value = user;
            }

            localStorage.setItem('user', JSON.stringify(state.value));
        },
        userLogout: (state, action) => {
            state.value = initialState.value;
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        pushMovie: (state, action) => {
            state.value.movies.push(action.payload);
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        addFavoriteRedux: (state, action) => {
            const index = action.payload;
            state.value.movies[index].favorite = true;
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        removeFavoriteRedux: (state, action) => {
            const index = action.payload;
            state.value.movies[index].favorite = false;
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        addRatingRedux: (state, action) => {
            const index = action.payload.index;
            state.value.movies[index].rating = action.payload.rating;
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        addNotesRedux: (state, action) => {
            const index = action.payload.index;
            state.value.movies[index].notes = action.payload.notes;
            localStorage.setItem('user', JSON.stringify(state.value));
        },
    }
});

export const { userAuthentication,
    userLogout,
    getUser,
    pushMovie,
    addFavoriteRedux,
    removeFavoriteRedux,
    addRatingRedux,
    addNotesRedux } = userSlice.actions;

export default userSlice.reducer;