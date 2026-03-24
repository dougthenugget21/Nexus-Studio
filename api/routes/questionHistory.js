const { Router } = require("express")

const questionHistoryController = require("../controller/questionHistory")

const questionHistoryRouter = Router()

questionHistoryRouter.get("/", questionHistoryController.allQuestions)
questionHistoryRouter.post("/", questionHistoryController.create)
questionHistoryRouter.get("/:session_id", questionHistoryController.bySessionID)
questionHistoryRouter.get("/student/:student_id", questionHistoryController.byStudentID)

module.exports = questionHistoryRouter