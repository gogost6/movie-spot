const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("../middlewares/logger");
const auth = require("../middlewares/auth");
const config = require(".");
const routes = require("./routes");

module.exports = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors(config.CORS));
    app.use(cookieParser(config.TOKEN_SECRET));
    app.use(logger());
    app.use(auth());
    app.use(express.json());

    app.use("/api", routes);
};
