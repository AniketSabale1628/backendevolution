const userCollection = require("../models/user")
const Quiz = require('../models/quiz');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const setCookie = require("../utils/cookie")
const {ErrorHandler, errorMiddleware} = require("../middlewares/Error")

const checkRoute = (req, res) => {
    res.status(200).json({
      success: true,
      message: 'API is Working'
    });
  };

  const register = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Check if the passwords match
        if (password !== confirmPassword) {
            return next(new ErrorHandler('Passwords do not match', 400));
        }

        const user = await userCollection.findOne({ email });

        if (user) {
            return next(new ErrorHandler('User already exists', 409));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await userCollection.create({
            name,
            email,
            password: hashedPassword,
            confirmPassword
        });

        const words = name.split(' ');
        const trimmedName = words.slice(0, 1).join(' ');

        return setCookie(
            res,
            createdUser,
            201,
            `${trimmedName} registered successfully`
        );
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userCollection.findOne({ email }).select('+password');

        if (!user) {
            return next(new ErrorHandler('Invalid email or password', 404));
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        const words = user.name.split(' ');
        const trimmedName = words.slice(0, 1).join(' ');

        if (passwordMatch) {
            return setCookie(res, user, 200, `Welcome ${trimmedName}`);
        }

        return next(new ErrorHandler('Invalid email or password', 404));

    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


const logout = (req, res, next) => {
    try {
        res.clearCookie('token', {
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "development" ? false : true
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};



// ... (existing code)

// quizController.js



const createQuiz = async (req, res) => {
  try {
    const { quizName, selectedType, questions, timer } = req.body;
    
    // Create a new quiz
    const newQuiz = new Quiz({
      quizName,
      selectedType,
      questions,
      timer,
    });

    // Save the quiz to the database
    const savedQuiz = await newQuiz.save();

    // Send the response
    res.status(201).json({ success: true, quiz: savedQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



module.exports = { checkRoute, register, login, logout, createQuiz };
