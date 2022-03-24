const router = require("express").Router();
const userService = require("../services/user");


router.post("/add-movie", async (req, res) => {
    // the obj should have name, rating, favorite, notes
    const { email, ...obj } = req.body;
    const record = await userService.addMovie(email, obj);
    res.json(record);
});

router.put("/favorites/add", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // Bool -> true
    const { email, name } = req.body;
    const record = await userService.addToFavorite(email, name, true);
    res.json(record);
});

router.put("/favorites/remove", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // Bool -> false
    const { email, name } = req.body;
    const record = await userService.addToFavorite(email, name, false);
    res.json(record);
});

router.put("/ratings/add", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // rating -> number
    const { email, name, rating } = req.body;
    const record = await userService.addRating(email, name, rating);
    res.json(record);
});

router.put("/notes/add", async (req, res) => {
    // we need with the req the email for the query
    // the name of the film in movies array
    // notes -> string
    const { email, name, notes } = req.body;
    const record = await userService.addNotes(email, name, notes);
    res.json(record);
});

module.exports = router;