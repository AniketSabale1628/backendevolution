 const mongoose = require('mongoose');
 
 const optionSchema = new mongoose.Schema({
   optionText: {
     type: String,
   },
   imageURL: {
     type: String,
   },
   isCorrect: {
     type: Boolean,
     default: false,
   },
  
 });
 
 const questionSchema = new mongoose.Schema({
   questionText: {
     type: String,
     required: true,
   },
   options: [optionSchema],
   
 });
 
 const quizSchema = new mongoose.Schema({
   quizName: {
     type: String,
     required: true,
   },
   type: {
     type: String,
     enum: ['Q&A', 'Poll'],
    //  required: true,
   },
   questions: [questionSchema],
   timer: {
     type: String,
     default: 0,
   },
   createdAt: {
     type: Date,
     default: Date.now,
   },
 });
 
 const Quiz = mongoose.model('Quiz', quizSchema);
 
 module.exports = Quiz;
 