const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const c = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (error) {
        console.log(error.message);
        console.log('Database not connected');
    }
};

module.exports = connectDB;
