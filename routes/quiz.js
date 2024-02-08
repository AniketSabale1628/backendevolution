const express = require('express');
const { getAllQuizzes, deleteQuizById, updateQuizById, shareQuizById }=require('../controllers/quiz');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();
router.get('/', getAllQuizzes);
router.delete('/:id',  deleteQuizById);
router.put('/:id',  updateQuizById);
router.post('/:id/share',  shareQuizById);

router.get('/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = router;