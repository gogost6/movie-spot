const { Schema, model } = require('mongoose');

const schema = {
    email: { type: String, required: true },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    favorites: [{ type: String }],
    notesAndRating: [{name: String, rating: Number, notes: String, favorites: String}],
};

module.exports = model('User', schema);