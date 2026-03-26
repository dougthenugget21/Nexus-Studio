const db = require('../../db/connect')

class Studentdetails {
    constructor({student_id, first_name, surname, email, password}) {
        this.student_id = student_id,
        this.first_name = first_name,
        this.surname = surname,
        this.email = email,
        this.password = password
    }

    static async getStudentByID (id) {
        const response = await db.query("SELECT * FROM student_details WHERE student_id = $1;", [id])
        if(response.rows.length != 1) {
            throw new Error("Cannot find student details with the id.")
        }
        return new Studentdetails(response.rows[0]);
    }

    static async getStudentByEmail(email) {
        const response = await db.query("SELECT * FROM student_details WHERE email = $1;", [email])
        if(response.rows.length != 1) {
            throw new Error("Cannot find student details with email.")
        }
        return new Studentdetails(response.rows[0]);
    }

    static async createStudent(studentData) {
        const {first_name, surname, email, password} = studentData;
        if(!studentData.first_name){throw new Error("Student name is missing")};
        const response = await db.query("INSERT INTO student_details (first_name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;", 
            [first_name, surname, email, password]);
        //console.log(response);
        const newStudent = response.rows[0];
        //const newStudent = await Studentdetails.getStudentByID(newStudentID);
        return newStudent;
    }
}

module.exports = Studentdetails;