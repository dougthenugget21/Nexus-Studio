db = require("../../db/connect")

class SessionHistory{

    constructor({}){
        this.session_id = session_id,
        this.student_id = student_id,
        this.total_attempts = total_attempts,
        this.score = score,
        this.time_taken = time_taken,
        this.test_date = test_date
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM session_history")

        if (response.rows.length === 0){
            throw new Error("No session history available.")
        }
        return response.rows.map(h => new SessionHistory(h))
    }

    static async createSession(data){
        if (!data.student_id){throw new Error("Student ID is missing")}
        if (!data.total_attempts){throw new Error("Total Attempts is missing")}
        if (!data.score){throw new Error("Score is missing")}
        if (!data.time_taken){throw new Error("Time taken is missing")}
        if (!data.test_date){throw new Error("Test date is missing")}

        const response = await db.query("INSERT INTO session_history (student_id, total_attempts, score, time_taken, test_date) VALUES ($1, $2, $3, $4, $5) RETURNING *", [data.student_id, data.total_attempts, data.score, data.time_taken, data.test_date])
        return new SessionHistory(response.rows[0])
    }

    static async getBySessionID(sessionID){
        const response = await db.query("SELECT * FROM session_history WHERE session_id = $1",[sessionID])

        if(response.rows.length !== 1){
            throw new Error("Recieving 0 or more than 1 session history entry when 1 should be recieved.")
        }
        return new SessionHistory(response.rows[0])
    }

    static async getByStudentID(studentID){
        const response = await db.query("SELECT * FROM session_history WHERE student_id = $1",[studentID])

        if(response.rows.length !== 1){
            throw new Error("Recieving 0 or more than 1 session history entry when 1 should be recieved.")
        }
        return new SessionHistory(response.rows[0])
    }
}