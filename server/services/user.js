const User = require('../models/User');

async function createUser(email, username, hashedPassword) {
    const user = new User({
        email,
        username,
        hashedPassword
    });

    await user.save();

    return user;
}

async function updateUser(id, body) {
    const user = await User.findOneAndUpdate(id, body, { safe: true, multi: true, new: true });
    await user.save();
    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    if (email) {
        return await User.findOne({ email: { $regex: pattern } }).lean();
    } else {
        return false;
    }
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    if (username) {
        const user = await User.findOne({ username: { $regex: pattern } }).lean();
        return user;
    } else {
        return false;
    }
}

async function getAllUsers() {
    let users = User.find({}).lean();
    return users;
}

async function addMovie(email, body) {
    // const user = await User.findOne({email});
    const record = await User.findOneAndUpdate(
        email,
        { $push: { movies: body } },
        { safe: true, multi: true, new: true }
    );

    return await record.save();
}

async function addToFavorite(email, name, bool) {
    const record = await User.findOneAndUpdate(
        {
            email: email,
            'movies.name': name
        },
        {
            $set: {
                'movies.$.favorite': bool
            }
        },
        null,
        (err) => {
            if (err) {
                console.log('Error:', err)
            } else {
                console.log('Updated')
            }
        }).clone().catch(function (err) { console.log(err) });

    return record;
}

async function addRating(email, name, rating) {
    const record = await User.findOneAndUpdate(
        {
            email: email,
            'movies.name': name
        },
        {
            $set: {
                'movies.$.rating': rating
            }
        },
        null,
        (err) => {
            if (err) {
                console.log('Error:', err)
            } else {
                console.log('Updated')
            }
        }).clone().catch(function (err) { console.log(err) });

    return record;
}

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    getUserByUsername,
    updateUser,
    addMovie,
    addToFavorite,
    addRating
};