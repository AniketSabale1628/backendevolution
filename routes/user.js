const express = require('express');
const { checkRoute, register, login, logout, createQuiz } = require('../controllers/user');

const isAuthenticated = require('../middlewares/auth');

const router = express.Router();

router.get('/', checkRoute);
router.post('/signup', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.post('/createquiz', createQuiz); 


router.get('/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = router;
