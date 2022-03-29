const env = process.env.NODE_ENV || "development";

const config = {
    development: {
        PORT: process.env.PORT || 3000,
        DB_CONNECTION: "mongodb://localhost:27017/movie-spot",
        COOKIE_NAME: "SESSION_DATA",
        TOKEN_SECRET: "my private secret secret",
        SALT_ROUNDS: 10,
        CORS: {
            origin: ["http://localhost:3000"],
            credentials: true,
        },
    },
    production: {
        PORT: process.env.PORT || 'https://movie-spot.vercel.app',
        COOKIE_NAME: "SESSION_DATA",
        TOKEN_SECRET: "very strong secret",
        SALT_ROUNDS: 10,
        CORS: {
            origin: ["https://movie-spot.vercel.app"],
            credentials: true,
        },
    },
};

module.exports = config[env];
