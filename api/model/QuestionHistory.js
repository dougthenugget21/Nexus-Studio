db = require("../../db/connect")

class QuestionHistory{

    constructor({id, student_id, session_id, question_id, ans_correctly}){
        this.id = id,
        this.student_id = student_id,
        this.session_id = session_id,
        this.question_id = question_id,
        this.ans_correctly = ans_correctly
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM question_history")

        if(response.rows.length === 0){
            throw new Error("No question history available")
        }
        return response.rows.map(h => new QuestionHistory(h))
    }

    static async createQuestionHistory(data){
        if(!data.student_id){throw new Error("Student ID is missing.")}
        if(!data.session_id){throw new Error("Session ID is missing.")}
        if(!data.question_id){throw new Error("Question ID is missing.")}
        if(!data.ans_correctly){throw new Error("Answered correctly is missing.")}

        const response = await db.query("INSERT INTO question_history (student_id, session_id, question_id, ans_correctly) VALUES ($1, $2, $3, $4) RETURNING *", [data.student_id, data.session_id, data.question_id, data.ans_correctly])
        return new QuestionHistory(response)
    }

    static async getBySessionID(session_id){
        const response = await db.query("SELECT * FROM question_history WHERE session_id = $1",[session_id])

        if(response.rows.length === 0){
            throw new Error("No question history recieved from this session id.")
        }
        return response.rows.map(h => {new QuestionHistory(h)})
    }

    static async getByStudentID(student_id){
    const response = await db.query("SELECT * FROM question_history WHERE student_id = $1",[student_id])

    if(response.rows.length === 0){
        throw new Error("Recieving 0 records for this student id.")
    }
    return response.rows.map(h => {new QuestionHistory(h)})
    }
}

module.exports = QuestionHistory