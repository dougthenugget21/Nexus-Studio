const { Router } = require("express")

const quizQuestionsController = require("../controller/quizQuestions")

const quizQuestionsRouter = Router()

quizQuestionsRouter.get("/", quizQuestionsController.allQuestions)
quizQuestionsRouter.get("/category/:category_id", quizQuestionsController.categoryQuestions)
quizQuestionsRouter.get("/:question_id", quizQuestionsController.questionByID)

module.exports = quizQuestionsRouter