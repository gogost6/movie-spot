const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
    const token = req.cookies[config.COOKIE_NAME];
    
    try {
        if (token) {
            const userData = jwt.verify(token, config.TOKEN_SECRET);
            req.user = userData;
        }
    } catch (err) {
        console.log(err);
        res.clearCookie(COOKIE_NAME);
        res.status(401).json({ message: 'Invalid token!' });
    }
    next();    
}
