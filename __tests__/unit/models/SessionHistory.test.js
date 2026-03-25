const SessionHistory = require("../../../api/model/SessionHistory")
const db = require("../../../db/connect")

describe('SessionHistory', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    describe('getAll', () => {
        it('resolves with session history entries on successful db query', async () => {
            const mockRows = [
                { session_id: 1, student_id: 10, total_attempts: 3, score: 80, time_taken: 120, test_date: '2024-01-01' },
                { session_id: 2, student_id: 11, total_attempts: 2, score: 90, time_taken: 100, test_date: '2024-01-02' }
            ]

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockRows })
            const result = await SessionHistory.getAll()
            expect(result).toHaveLength(2)
            expect(result[0]).toBeInstanceOf(SessionHistory)
            expect(result[0].student_id).toBe(10)
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM session_history")
        })

        it('throws an Error when no session history is found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            await expect(SessionHistory.getAll()).rejects.toThrow("No session history available.")
        })
    })
    describe('createSession', () => {
        it('creates a new session history entry when valid data is provided', async () => {
            const mockData = {
                student_id: 5,
                total_attempts: 3,
                score: 75,
                time_taken: 150,
                test_date: '2024-01-10'
            }

            const mockResponse = {
                rows: [{ session_id: 1, ...mockData }]
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse)

            const result = await SessionHistory.createSession(mockData)

            expect(result).toBeInstanceOf(SessionHistory)
            expect(result.student_id).toBe(5)
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO session_history (student_id, total_attempts, score, time_taken, test_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [5, 3, 75, 150, '2024-01-10']
            )
        })

        it('throws an Error when required fields are missing', async () => {
            await expect(SessionHistory.createSession({})).rejects.toThrow("Student ID is missing")
        })
    })

    describe('getBySessionID', () => {
        it('resolves with a SessionHistory instance when found', async () => {
            const mockRow = [{
                session_id: 1,
                student_id: 10,
                total_attempts: 3,
                score: 80,
                time_taken: 120,
                test_date: '2024-01-01'
            }]

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockRow })

            const result = await SessionHistory.getBySessionID(1)

            expect(result).toBeInstanceOf(SessionHistory)
            expect(result.session_id).toBe(1)
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM session_history WHERE session_id = $1",
                [1]
            )
        })

        it('throws an Error when no matching session is found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            await expect(SessionHistory.getBySessionID(1))
                .rejects
                .toThrow("Recieving 0 or more than 1 session history entry when 1 should be recieved.")
        })
    })

    describe('getByStudentID', () => {
        it('resolves with a SessionHistory instance when found', async () => {
            const mockRow = [{
                session_id: 1,
                student_id: 20,
                total_attempts: 4,
                score: 85,
                time_taken: 110,
                test_date: '2024-01-05'
            }]

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockRow })

            const result = await SessionHistory.getByStudentID(20)

            expect(result).toBeInstanceOf(SessionHistory)
            expect(result.student_id).toBe(20)
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM session_history WHERE student_id = $1",
                [20]
            )
        })

        it('throws an Error when no matching student session is found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            await expect(SessionHistory.getByStudentID(20))
                .rejects
                .toThrow("Recieving 0 or more than 1 session history entry when 1 should be recieved.")
        })
    })
})