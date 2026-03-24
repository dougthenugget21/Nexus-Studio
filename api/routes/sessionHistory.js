const { Router } = require("express")

const sessionHistoryController = require("../controller/sessionHistory")

const sessionHistoryRouter = Router()

sessionHistoryRouter.get("/", sessionHistoryController.allQuestions)
sessionHistoryRouter.get("/:category_id", sessionHistoryController.categoryQuestions)
sessionHistoryRouter.get("/:question_id", sessionHistoryController.questionByID)

module.exports = sessionHistoryRouter