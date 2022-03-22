const express = require("express");
const path = require("path");

const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");

const port = process.env.PORT || '5000';
const app = express();

databaseConfig(app);

expressConfig(app);

app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);