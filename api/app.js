const express = require('express');
const cors = require('cors');

const studentDetailsRouter = require('./routes/studentdetails');
const categoriesRouter = require("./routes/categories")
const quizQuestionsRouter = require("./routes/quizQuestions")

const api = express();

api.use(cors());
api.use(express.json());

api.use("/studentdata", studentDetailsRouter);
api.use("/categories", categoriesRouter)
api.use("/quizquestions", quizQuestionsRouter)

module.exports = api;