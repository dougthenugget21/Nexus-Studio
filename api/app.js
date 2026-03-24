const express = require('express');
const cors = require('cors');

const studentDetailsRouter = require('./routes/studentdetails');
const categoriesRouter = require("./routes/categories")
const quizQuestionsRouter = require("./routes/quizQuestions");
const sessionHistoryRouter = require('./routes/sessionHistory');
const questionHistoryRouter = require('./routes/questionHistory');

const api = express();

api.use(cors());
api.use(express.json());

api.use("/studentdata", studentDetailsRouter);
api.use("/categories", categoriesRouter)
api.use("/quizquestions", quizQuestionsRouter)
api.use("/sessionhistory", sessionHistoryRouter)
api.use("/questionhistory", questionHistoryRouter)

module.exports = api;