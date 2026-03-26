const { describe } = require("node:test")
const SessionHistory = require("../../../api/model/SessionHistory")
const db = require("../../../db/connect")
const { Session } = require("node:inspector")

describe("SessionHistory", () => {
    beforeEach(() => {jest.clearAllMocks()})

    afterAll(() => {jest.resetAllMocks()})

    describe("getAll", () => {
        it("returns all session history entries on successful db query", async () => {
            const mockSessionHistories = [
                {session_id: 1, category_id: 1, student_id: 1, total_attempts: 1, score: 100, time_taken:"10 mins", test_date:"today"},
                {session_id: 2, category_id: 1, student_id: 1, total_attempts: 1, score: 100, time_taken:"10 mins", test_date:"today"},
                {session_id: 3, category_id: 1, student_id: 1, total_attempts: 1, score: 100, time_taken:"10 mins", test_date:"today"}
            ]

            jest.spyOn(db, "query").mockResolvedValueOnce({rows: mockSessionHistories})

            const sessionHistories = await SessionHistory.getAll()

            expect(sessionHistories).toHaveLength(3)
            expect(sessionHistories[0]).toHaveProperty("session_id")
            expect(sessionHistories[0].score).toBe(100)
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM session_history")
        })

        it("throws an error when no session histories are found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({rows:[]})

            await expect(SessionHistory.getAll()).rejects.toThrow("No session history available.")
        })
    })

    describe("createSession", () => {
        it("returns the session history entry on successful creation", async () => {
            let data = {category_id: 1, student_id: 1, total_attempts: 1, score: 100, time_taken:"10 mins", test_date:"today"}
            jest.spyOn(db, "query").mockResolvedValueOnce({rows: [{...data, session_id:1}]})

            const result = await SessionHistory.createSession(data)

            expect(result).toBeInstanceOf(SessionHistory)
            expect(result).toHaveProperty("session_id", 1)
            expect(result).toHaveProperty("student_id", 1)
            expect(result).toHaveProperty("score", 100)
            expect(db.query).toHaveBeenCalledWith("INSERT INTO session_history (student_id, category_id, total_attempts, score, time_taken, test_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [data.student_id, data.category_id, data.total_attempts, data.score, data.time_taken, data.test_date])
        })

        it("should throw an error when student id is missing", async () => {
            const incompleteSessionHistory = {category_id: 1, total_attempts: 1, score: 100, time_taken:"10 mins", test_date:"today"}

            await expect(SessionHistory.createSession(incompleteSessionHistory)).rejects.toThrow("Student ID is missing")
        })
    })
})