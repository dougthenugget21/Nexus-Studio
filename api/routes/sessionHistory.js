const { Router } = require("express")

const sessionHistoryController = require("../controller/sessionHistory")

const sessionHistoryRouter = Router()

sessionHistoryRouter.get("/", sessionHistoryController.allSessions)
sessionHistoryRouter.post("/", sessionHistoryController.create)
sessionHistoryRouter.get("/:session_id", sessionHistoryController.sessionsByID)
sessionHistoryRouter.get("/student/:student_id", sessionHistoryController.sessionsByStudentID)
sessionHistoryRouter.get("/leaderboard/score", sessionHistoryController.getStudentSessionByScore)
sessionHistoryRouter.get("/leaderboard/timetaken", sessionHistoryController.getStudentSessionByTimeTaken)

module.exports = sessionHistoryRouter