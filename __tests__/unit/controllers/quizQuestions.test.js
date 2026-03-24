const { describe, beforeEach } = require("node:test")
const quizQuestionsController = require("../../../api/controller/quizQuestions")
const QuizQuestion = require("../../../api/model/QuizQuestion")

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };

describe("QuizQuestions Controller", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("allQuestions", () => {
        it("returns all quiz questions with status code 200", async () => {
            const mockQuizQuestions = ["q1", "q2", "q3"]
            jest.spyOn(QuizQuestion, "getAll").mockResolvedValueOnce(mockQuizQuestions)

            await quizQuestionsController.allQuestions(null, mockRes)

            expect(QuizQuestion.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(mockQuizQuestions)
        })

        it("returns an error upon failure", async () => {
            jest.spyOn(QuizQuestion, "getAll").mockRejectedValue(new Error("Database is unable to return any questions"))

            await quizQuestionsController.allQuestions(null, mockRes)

            expect(QuizQuestion.getAll).toHaveBeenCalled()
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({error:"Database is unable to return any questions"})
        })
    })

    describe("categoryQuestions", () => {

        beforeEach(() => jest.clearAllMocks())

        afterAll(() => jest.resetAllMocks())

        it("returns questions of a given category with status code 200", async () => {
            jest.spyOn(QuizQuestion, "getByCategory").mockResolvedValueOnce(["q1", "q2", "q3"])
            mockReq = {params: {category_id: 1}}

            await quizQuestionsController.categoryQuestions(mockReq, mockRes)

            expect(QuizQuestion.getByCategory).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(["q1", "q2", "q3"])
        })

        it("throws an error if no questions of this category are found", async () => {
            jest.spyOn(QuizQuestion, "getByCategory").mockRejectedValue(new Error("Database is unable to return any questions from this category"))
        
            await quizQuestionsController.categoryQuestions(mockReq, mockRes)

            expect(QuizQuestion.getByCategory).toHaveBeenCalled()
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: "Database is unable to return any questions from this category"})
        })
    })

    describe("questionByID", () => {
        let mockQuizQuestion, mockReq
        beforeEach(() => {
            mockQuizQuestion = {question_id: 1, category_id: 1, question: "Is it ABCD?", option_1: "A", option_2: "B", option_3: "C", option_4: "D", answer: 1}
            mockReq = {params: {question_id: 1}}
        })

        it("returns a question with status code 200 when matching question ID", async () => {
            jest.spyOn(QuizQuestion, "getByID").mockResolvedValueOnce(new QuizQuestion(mockQuizQuestion))

            await quizQuestionsController.questionByID(mockRes, mockReq)

            expect(QuizQuestion.getByID).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(new QuizQuestion(mockQuizQuestion))
        })

        it("throws an error if quiz question with this id is not found.", async () => {
            jest.spyOn(QuizQuestion, "getByID").mockRejectedValue(new Error("No question with this ID found in the database."))

            await quizQuestionsController.questionByID(mockReq, mockRes)

            expect(QuizQuestion.getByID).toHaveBeenCalled()
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error:"No question with this ID found in the database."})
        })
    })
})