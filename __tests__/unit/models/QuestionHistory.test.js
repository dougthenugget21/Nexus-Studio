const QuestionHistory = require("../../../api/model/QuestionHistory")
const db = require("../../../db/connect")

describe("QuestionHistory Model", () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe("getAll", () => {
        it("resolves with QuestionHistory instances on successful db query", async () => {
            const mockRows = [
                { id: 1, student_id: 10, session_id: 2, question_id: 5, ans_correctly: true },
                { id: 2, student_id: 11, session_id: 3, question_id: 6, ans_correctly: false }
            ]

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockRows })

            const result = await QuestionHistory.getAll()

            expect(result).toHaveLength(2)
            expect(result[0]).toBeInstanceOf(QuestionHistory)
            expect(result[0].student_id).toBe(10)
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM question_history")
        })

        it("throws an Error when no question history exists", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(QuestionHistory.getAll()).rejects.toThrow("No question history available")
        })
    })
    describe("createQuestionHistory", () => {
        it("creates a new question history entry when valid data is provided", async () => {
            const mockData = {
                student_id: 1,
                session_id: 2,
                question_id: 3,
                ans_correctly: true
            }

            const mockResponse = {
                rows: [{ id: 10, ...mockData }]
            }

            jest.spyOn(db, "query").mockResolvedValueOnce(mockResponse)

            const result = await QuestionHistory.createQuestionHistory(mockData)

            expect(result).toBeInstanceOf(QuestionHistory)
            expect(result.id).toBe(10)
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO question_history (student_id, session_id, question_id, ans_correctly) VALUES ($1, $2, $3, $4) RETURNING *",
                [1, 2, 3, true]
            )
        })

        it("throws an Error when required fields are missing", async () => {
            await expect(QuestionHistory.createQuestionHistory({}))
                .rejects
                .toThrow("Student ID is missing.")
        })
    })

    describe("getBySessionID", () => {
        it("returns an array of QuestionHistory instances for a session", async () => {
            const mockRows = [
                { id: 1, student_id: 10, session_id: 5, question_id: 3, ans_correctly: true }
            ]

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockRows })

            const result = await QuestionHistory.getBySessionID(5)

            expect(result).toHaveLength(1)
            expect(result[0]).toBeInstanceOf(QuestionHistory)
            expect(result[0].session_id).toBe(5)
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM question_history WHERE session_id = $1",
                [5]
            )
        })

        it("throws an Error when no records found for session", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(QuestionHistory.getBySessionID(5))
                .rejects
                .toThrow("No question history recieved from this session id.")
        })
    })
    describe("getByStudentID", () => {
        it("returns an array of QuestionHistory instances for a student", async () => {
            const mockRows = [
                { id: 1, student_id: 20, session_id: 3, question_id: 7, ans_correctly: false }
            ]

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockRows })

            const result = await QuestionHistory.getByStudentID(20)

            expect(result).toHaveLength(1)
            expect(result[0]).toBeInstanceOf(QuestionHistory)
            expect(result[0].student_id).toBe(20)
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM question_history WHERE student_id = $1",
                [20]
            )
        })

        it("throws an Error when no records found for student", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(QuestionHistory.getByStudentID(20))
                .rejects
                .toThrow("Recieving 0 records for this student id.")
        })
    })
})