db = require("../../db/connect")

class SessionHistory{

    constructor({session_id, student_id, category_id, total_attempts, score, time_taken, test_date}){
        this.session_id = session_id,
        this.category_id = category_id,
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

    static async getStudentSessionByScore(){
        const response = await db.query("SELECT AVG(session_history.score) AVG_SCORE, student_details.first_name first_name, student_details.surname, student_details.email FROM session_history JOIN student_details ON session_history.student_id = student_details.student_id GROUP BY student_details.first_name, student_details.surname, student_details.email ORDER BY AVG_SCORE DESC;")
        if (response.rows.length === 0){
            throw new Error("No session history available.")
        }
        //return response.rows.map(h => new SessionHistory(h))
        return response.rows.map(h => ({
            first_name: h.first_name,
            surname: h.surname,
            email: h.email,
            avg_score: parseFloat(h.avg_score),
        }));
    }
    
    static async getStudentSessionByTimeTaken(){
        const response = await db.query("SELECT AVG(session_history.time_taken) AVG_TIMETAKEN, student_details.first_name, student_details.surname, student_details.email FROM session_history JOIN student_details ON session_history.student_id = student_details.student_id GROUP BY student_details.first_name, student_details.surname, student_details.email ORDER BY AVG_TIMETAKEN ASC;")
        if (response.rows.length === 0){
            throw new Error("No session history available.")
        }
        //return response.rows.map(h => new SessionHistory(h))
        return response.rows.map(h => ({
            first_name: h.first_name,
            surname: h.surname,
            email: h.email,
            avg_timetaken: parseFloat(h.avg_timetaken),
        }));
    }

    static async createSession(data){
        //console.log(data.time_taken + "From API")
        if (!data.student_id){throw new Error("Student ID is missing")}
        if (!data.total_attempts){throw new Error("Total Attempts is missing")}
        if (!data.score){throw new Error("Score is missing")}
        if (!data.time_taken){throw new Error("Time taken is missing")}
        if (!data.test_date){throw new Error("Test date is missing")}
        const response = await db.query("INSERT INTO session_history (student_id, category_id, total_attempts, score, time_taken, test_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [data.student_id, data.category_id, data.total_attempts, data.score, data.time_taken, data.test_date])
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
        //console.log(response);
        if(response.rows.length === 0){
            throw new Error("No quiz sessions available for the student")
        }
        return response.rows.map(h => new SessionHistory(h))
    }

    static async getByStudentIDCategoryID(studentID, categoryID) {
        const response = await db.query("SELECT * FROM session_history WHERE student_id = $1 and category_id = $2 ORDER BY test_date DESC LIMIT 1;", [studentID, categoryID]);
        if(response.rows.length !== 1){
            throw new Error("Receiving more than 1 row for the latest data")
        }
        return new SessionHistory(response.rows[0])
    }
}

module.exports = SessionHistory