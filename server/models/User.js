const { Schema, model } = require('mongoose');

const schema = {
    email: { type: String, required: true },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    movies: [{name: String, rating: Number, notes: String, favorite: Boolean}],
};

module.exports = model('User', schema);