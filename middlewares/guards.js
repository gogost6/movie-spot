module.exports = {
    isAuth() {
        return (req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    },
    isGuest() {
        return (req, res, next) => {
            if (!req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    }
};