const userCollection = require("../models/user");
const { ErrorHandler } = require("./Error");
const jwt = require('jsonwebtoken');
// DB_URL="mongodb+srv://sanket:Sanket123@cluster0.h3xhjkr.mongodb.net/?retryWrites=true&w=majority"

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new ErrorHandler('Unauthorized', 401));
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userCollection.findById(data._id);
        next();
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }

    res.redirect('/login');
};

module.exports = isAuthenticated;
