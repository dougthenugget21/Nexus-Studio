const Studentdetails = require("../../../api/model/Studentdetails");
const db = require("../../../db/connect");

describe("Studentdetails Model", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("getStudentByID", () => {
        it("returns a Studentdetails instance when a record is found", async () => {
            const mockRow = [{
                student_id: 1,
                first_name: "John",
                surname: "Doe",
                email: "john@example.com",
                password: "hashedpass"
            }];

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockRow });

            const result = await Studentdetails.getStudentByID(1);

            expect(result).toBeInstanceOf(Studentdetails);
            expect(result.student_id).toBe(1);
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM student_details WHERE student_id = $1;",
                [1]
            );
        });

        it("throws an error when no student is found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Studentdetails.getStudentByID(1))
                .rejects
                .toThrow("Cannot find student details with the id.");
        });
    });


    describe("getStudentByEmail", () => {
        it("returns a Studentdetails instance when a record is found", async () => {
            const mockRow = [{
                student_id: 2,
                first_name: "Jane",
                surname: "Smith",
                email: "jane@example.com",
                password: "hashedpass"
            }];

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockRow });

            const result = await Studentdetails.getStudentByEmail("jane@example.com");

            expect(result).toBeInstanceOf(Studentdetails);
            expect(result.email).toBe("jane@example.com");
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM student_details WHERE email = $1;",
                ["jane@example.com"]
            );
        });

        it("throws an error when no student is found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Studentdetails.getStudentByEmail("missing@example.com"))
                .rejects
                .toThrow("Cannot find student details with email.");
        });
    });


    describe("createStudent", () => {
        it("creates a new student and returns the full Studentdetails instance", async () => {
            const mockData = {
                first_name: "Alice",
                surname: "Brown",
                email: "alice@example.com",
                password: "hashedpass"
            };

            // First DB insert returns new student_id
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [{ student_id: 10 }]
            });

            // Second call (getStudentByID) returns full student record
            jest.spyOn(Studentdetails, "getStudentByID").mockResolvedValueOnce(
                new Studentdetails({
                    student_id: 10,
                    ...mockData
                })
            );

            const result = await Studentdetails.createStudent(mockData);

            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO student_details (first_name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING student_id;",
                ["Alice", "Brown", "alice@example.com", "hashedpass"]
            );

            expect(Studentdetails.getStudentByID).toHaveBeenCalledWith(10);
            expect(result).toBeInstanceOf(Studentdetails);
            expect(result.student_id).toBe(10);
        });
    });
});
