const { describe, beforeEach } = require("node:test")
const QuizQuestion = require("../../../api/model/QuizQuestion")
const db = require("../../../db/connect")

describe("QuizQuestion", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("getAll", () => {
        it("resolves with quiz questions on successful db query", async () => {
            const mockQuizQuestions = [
                {question_id: 1, category_id: 1, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 1},
                {question_id: 2, category_id: 2, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 2},
                {question_id: 3, category_id: 3, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 3}
            ]

            jest.spyOn(db, "query").mockResolvedValueOnce({rows: mockQuizQuestions})

            const quizQuestions = await QuizQuestion.getAll()

            expect(quizQuestions).toHaveLength(3)
            expect(quizQuestions[0]).toHaveProperty("id")
            expect(quizQuestions[0].question).toBe("Is it ABCD?")
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM quiz_questions")
        })

        it("throws an error when no quiz questions are found", async () => {
          jest.spyOn(db, "query").mockResolvedValueOnce({rows: [] }) 

          await expect(QuizQuestion.getAll()).rejects.toThrow("No quiz questions available.")
        })
    })

    describe("getByCategory", () => {
        it("resolves with a list of quiz questions on successful db query", async () => {
            const mockQuizQuestions = [
                {question_id: 1, category_id: 1, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 1},
                {question_id: 2, category_id: 1, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 2},
                {question_id: 3, category_id: 1, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 3}
            ]
            jest.spyOn(db,"query").mockResolvedValueOnce({rows:mockQuizQuestions})
            const result = await QuizQuestion.getByCategory(1)

            expect(result[0]).toBeInstanceOf(QuizQuestion)
            expect(result[0].category_id).toBe(1)
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM quiz_questions WHERE category_id = $1", [1])
        })

        it("throws an error when no quiz questions with this category can be found", async () => {
            jest.spyOn(db,"query").mockResolvedValueOnce({rows: [] })

            await expect(QuizQuestion.getByCategory(4)).rejects.toThrow("No quiz questions in this category available.")
        })
    })

    describe("getByID", () => {
        it("resolves with a question on successful db query", async () => {
            const mockQuizQuestion = [{question_id: 1, category_id: 1, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 1}]
            jest.spyOn(db, "query").mockResolvedValueOnce({rows: mockQuizQuestion})

            const result = await QuizQuestion.getByID(1)

            expect(result).toBeInstanceOf(QuizQuestion)
            expect(result.id).toBe(1)
            expect(result.question).toBe("Is it ABCD?")
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM quiz_questions WHERE question_id = $1", [1])
        })        

        it("throws an error when no quiz question with this id can be found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({rows: [] })
            await expect(QuizQuestion.getByID(999)).rejects.toThrow("No quiz question available with this ID.")
        })
    })
})