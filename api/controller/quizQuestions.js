const QuizQuestion = require("../model/QuizQuestion")

async function allQuestions(req, res) {
    try{
        const quizQuestions = await QuizQuestion.getAll()
        res.status(200).json(quizQuestions)
    } catch (err) {
        res.status(500).json({"error": err.message })
    }
}

async function categoryQuestions(req, res) {
    try{
        const category_id = parseInt(req.params.category_id) 
        const quizQuestions = await QuizQuestion.getByCategory(category_id)
        res.status(200).json(quizQuestions)
    } catch(err){
        res.status(404).json({"error":err.message})
    }
    
}

async function questionByID(req, res){
    try{
        const question_id = parseInt(req.params.question_id)
        const quizQuestion = await QuizQuestion.getByID(question_id)
        res.status(200).json(quizQuestion)
    } catch(err){
        res.status(404).json({"error":err.message})
    }
}

module.exports = { allQuestions, categoryQuestions, questionByID }