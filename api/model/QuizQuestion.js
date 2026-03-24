db = require("../../db/connect")

class QuizQuestion{

    constructor({question_id, category_id, question, option_1, option_2, option_3, option_4, correct_answer}){
        this.id = question_id,
        this.category_id = category_id,
        this.question = question,
        this.option_1 = option_1,
        this.option_2 = option_2,
        this.option_3 = option_3,
        this.option_4 = option_4,
        this.answer = correct_answer
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM quiz_questions")
        
        if (response.rows.length === 0){
            throw new Error("No quiz questions available.")
        }
        return response.rows.map(q => new QuizQuestion(q))
    }

    static async getByCategory(category_id){
        const response = await db.query("SELECT * FROM quiz_questions WHERE category_id = $1", [category_id])

        if(response.rows.length === 0){
            throw new Error("No quiz questions in this category available.")
        }
        return response.rows.map(q => new QuizQuestion(q))
    }

    static async getByID(question_id){
        const response = await db.query("SELECT * FROM quiz_questions WHERE question_id = $1", [question_id])
    
        if (response.rows.length !== 1){
            throw new Error("No quiz question available with this ID.")
        }
        return new QuizQuestion(response.rows[0])
    }
}

module.exports = QuizQuestion