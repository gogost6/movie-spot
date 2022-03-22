const mongoose = require("mongoose");
const config = require(".");

module.exports = (app) => {
    if (process.env.NODE_ENV == 'production') {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        //mongoose.set("useFindAndModify", false);

        const db = mongoose.connection;
        db.on("error", (err) => {
            console.error("DB error: " + err);
        });
        db.once("open", function () {
            console.log("DB connected!");
        });
    } else {
        mongoose.connect(config.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.on("error", (err) => {
            console.error("DB error: " + err);
        });
        db.once("open", function () {
            console.log("DB connected!");
        });
    }
};
