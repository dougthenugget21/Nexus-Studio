const { describe } = require("node:test")
const Studentdetails = require("../../../api/model/Studentdetails")
const db = require("../../../db/connect")

describe("Studentdetails", () => {
    beforeEach(() => {jest.clearAllMocks()})

    afterAll(() => {jest.resetAllMocks()})

    describe("getStudentByID", () => {
        it("returns student details on successful db query", async () => {
            const mockStudentDetails = [{student_id: 1, first_name:"Jim", surname:"Cousins", email:"my email",password:"supersecretandencrypted"}]
            jest.spyOn(db, "query").mockResolvedValueOnce({rows: mockStudentDetails})

            const result = await Studentdetails.getStudentByID(1)

            expect(result).toBeInstanceOf(Studentdetails)
            expect(result.student_id).toBe(1)
            expect(result.first_name).toBe("Jim")
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM student_details WHERE student_id = $1;", [1])
        })

        it("throws an error when no students are found with this ID", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({rows: []})
            await expect(Studentdetails.getStudentByID(999)).rejects.toThrow("Cannot find student details with the id.")
        })

    })

    describe("createStudent", () => {
        it("returns the student details on successful creation", async () => {
            let studentData = {first_name:"Jim", surname:"Cousins", email:"my email",password:"supersecretandencrypted"}
            jest.spyOn(db, "query").mockResolvedValueOnce({rows: [{...studentData, student_id: 1}]})

            const result = await Studentdetails.createStudent(studentData)

            expect(result).toBeInstanceOf(Studentdetails)
            expect(result).toHaveProperty("first_name", "Jim")
            expect(result).toHaveProperty("surname", "Cousins")
            expect(result).toHaveProperty("student_id", 1)
            expect(db.query).toHaveBeenCalledWith("INSERT INTO student_details (first_name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING student_id;", 
            [first_name, surname, email, password])
        })

        it("should throw an error when student name is missing", async () => {
            const incompleteStudentData = {surname:"Cousins", email:"my email",password:"supersecretandencrypted"}
        
            await expect(Studentdetails.createStudent(incompleteStudentData)).rejects.toThrow("Student name is missing")
        })
    })
})