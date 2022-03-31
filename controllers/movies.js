const router = require("express").Router();
const userService = require("../services/user");
const config = require("../config");
const jwt = require("jsonwebtoken");

router.post("/add-movie", async (req, res) => {
    // the obj should have name, rating, favorite, notes, poster_path
    const { email, ...obj } = req.body;
    const record = await userService.addMovie(email, obj);
    const userViewModel = {
        _id: record._id,
        email: record.email,
        username: record.username,
        movies: record.movies
    };
    res.clearCookie(config.COOKIE_NAME);
    const token = jwt.sign(userViewModel, config.TOKEN_SECRET);
    res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
    res.json(record);
});

router.put("/favorites/add", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // Bool -> true
    const { email, name } = req.body;
    const record = await userService.addToFavorite(email, name, true);

    const userViewModel = {
        _id: record._id,
        email: record.email,
        username: record.username,
        movies: record.movies
    };
    console.log(record);

    res.clearCookie(config.COOKIE_NAME);
    const token = jwt.sign(userViewModel, config.TOKEN_SECRET);
    res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
    res.json(record);
});

router.put("/favorites/remove", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // Bool -> false
    const { email, name } = req.body;
    const record = await userService.addToFavorite(email, name, false);
    const userViewModel = {
        _id: record._id,
        email: record.email,
        username: record.username,
        movies: record.movies
    };
    console.log(record.movies);
    res.clearCookie(config.COOKIE_NAME);
    const token = jwt.sign(userViewModel, config.TOKEN_SECRET);
    res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
    res.json(record);
});

router.put("/ratings/add", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // rating -> number
    const { email, name, rating } = req.body;
    const record = await userService.addRating(email, name, rating);
    const userViewModel = {
        _id: record._id,
        email: record.email,
        username: record.username,
        movies: record.movies
    };
    res.clearCookie(config.COOKIE_NAME);
    const token = jwt.sign(userViewModel, config.TOKEN_SECRET);
    res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
    res.json(record);
});

router.put("/notes/add", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // notes -> string
    const { email, name, notes } = req.body;
    const record = await userService.addNotes(email, name, notes);
    const userViewModel = {
        _id: record._id,
        email: record.email,
        username: record.username,
        movies: record.movies
    };
    res.clearCookie(config.COOKIE_NAME);
    const token = jwt.sign(userViewModel, config.TOKEN_SECRET);
    res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
    res.json(record);
});

module.exports = router;