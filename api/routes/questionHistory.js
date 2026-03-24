const { Router } = require("express")

const questionHistoryController = require("../controller/questionHistory")

const questionHistoryRouter = Router()

questionHistoryRouter.get("/", questionHistoryController.allQuestions)
questionHistoryRouter.get("/:category_id", questionHistoryController.categoryQuestions)
questionHistoryRouter.get("/:question_id", questionHistoryController.questionByID)

module.exports = questionHistoryRouter