const QuestionHistory = require("../model/QuestionHistory")

async function allQuestions(req, res) {
    try{
        const questions = await QuestionHistory.getAll()
        res.status(200).json(questions)
    } catch(err) {
        res.status(500).json({"error":err.message})
    }
}

async function create(req, res) {
    try{
        const data = req.body
        const newQuestion = await QuestionHistory.createQuestionHistory(data)
        res.status(201).json(newQuestion)
    } catch(err){
        res.status(500).json({"error":err.message})
    }
}

async function bySessionID(req, res) {
    try{
        const sessions_id = parseInt(req.params.sessions_id)
        const questionHistory = await QuestionHistory.getBySessionID(sessions_id)
        res.status(200).json(questionHistory)
    } catch(err){
        res.status(404).json({"error":err.message})
    }
}
async function byStudentID(req, res) {
    try{
        const student_id = parseInt(req.params.student_id)
        const questionHistory = await QuestionHistory.getByStudentID(student_id)
        res.status(200).json(questionHistory)
    } catch(err){
        res.status(404).json({"error":err.message})
    }
}

module.exports = {allQuestions, create, bySessionID, byStudentID}