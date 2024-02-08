    const express = require('express');
    const allUserRoutes = require('./routes/user');
    const allQuizRoutes = require('./routes/quiz');
    const dotenv = require('dotenv');
    const cookieParser = require('cookie-parser');
    const cors = require('cors');

    const app = express();

    dotenv.config({
        path: './data/config.env'
    });

    app.use(express.json());
    app.use(cookieParser());

    app.use(
        cors({
            origin: [process.env.FRONTEND_URL],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        })
    );

    app.use('/api/v1/user', allUserRoutes);
    app.use('/api/v1/quiz', allQuizRoutes);

    // Other routes and middleware can be added as needed.

    module.exports = app;
