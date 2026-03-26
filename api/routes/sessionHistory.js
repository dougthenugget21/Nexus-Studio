const { Router } = require("express")

const sessionHistoryController = require("../controller/sessionHistory")

const sessionHistoryRouter = Router()

sessionHistoryRouter.get("/", sessionHistoryController.allSessions)
sessionHistoryRouter.post("/", sessionHistoryController.create)
sessionHistoryRouter.get("/student/:student_id", sessionHistoryController.sessionsByStudentID)
sessionHistoryRouter.get("/leaderboard/score", sessionHistoryController.getStudentSessionByScore)
sessionHistoryRouter.get("/leaderboard/timetaken", sessionHistoryController.getStudentSessionByTimeTaken)
sessionHistoryRouter.get("/category", sessionHistoryController.getByStudentIDCategoryID)
sessionHistoryRouter.get("/:session_id", sessionHistoryController.sessionsByID)

module.exports = sessionHistoryRouter