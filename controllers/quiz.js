const Quiz = require('../models/quiz');
const { ErrorHandler } = require("../middlewares/Error");

const getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find();

        // Format dates before sending response
        const formattedQuizzes = quizzes.map(quiz => ({
            ...quiz.toObject(),
            createdAt: formatDate(quiz.createdAt) // Format the date
        }));

        res.status(200).json({ success: true, quizzes: formattedQuizzes });
    } catch (error) {
        next(new ErrorHandler('Failed to fetch quizzes', 500));
    }
};

// Function to format date in "Day Month Name Year" format
function formatDate(date) {
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };

    return date.toLocaleDateString('en-US', options);
}



const deleteQuizById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedQuiz = await Quiz.findByIdAndDelete(id);

        if (!deletedQuiz) {
            return next(new ErrorHandler('Quiz not found', 404));
        }

        res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
    } catch (error) {
        next(new ErrorHandler('Failed to delete quiz', 500));
    }
};

const updateQuizById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedQuiz);
      } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
};

const shareQuizById = async (req, res, next) => {
    try {
        const link = `https://example.com/quiz/${req.params.id}`;
        res.status(200).json({ success: true, link });
    } catch (error) {
        next(new ErrorHandler('Failed to share quiz', 500));
    }
};

module.exports = { getAllQuizzes, deleteQuizById, updateQuizById, shareQuizById };
