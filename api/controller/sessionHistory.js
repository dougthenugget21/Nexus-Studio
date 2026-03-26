const SessionHistory = require("../model/SessionHistory")

async function allSessions(req, res) {
    try{
        const sessions = await SessionHistory.getAll()
        res.status(200).json(sessions)
    } catch (err) {
        res.status(500).json({"error":err.message})
    }
}

async function getStudentSessionByScore(req, res) {
    try{
        const sessions = await SessionHistory.getStudentSessionByScore()
        console.log(sessions)
        res.status(200).json(sessions)
    } catch (err) {
        res.status(500).json({"error":err.message})
    }
}

async function getStudentSessionByTimeTaken(req, res) {
    try{
        const sessions = await SessionHistory.getStudentSessionByTimeTaken()
        res.status(200).json(sessions)
    } catch (err) {
        res.status(500).json({"error":err.message})
    }
}

async function create(req, res) {
    try{
        //console.log("Hi from Controller")
        const data = req.body
        const newSession = await SessionHistory.createSession(data)
        res.status(201).json(newSession)
    } catch (err) {
        res.status(500).json({"error":err.message})
    }
}

async function sessionsByID(req, res) {
    try{
        const session_id = parseInt(req.params.session_id )
        const session = await SessionHistory.getBySessionID(session_id)
        res.status(200).json(session)
    } catch (err) {
        res.status(404).json({"error":err.message})
    }
}

async function sessionsByStudentID(req, res) {
    try{
        const student_id = parseInt(req.params.student_id )
        const session = await SessionHistory.getByStudentID(student_id)
        //console.log(session);
        res.status(200).json(session)
    } catch (err) {
        res.status(404).json({"error":err.message})
    }
}

async function getByStudentIDCategoryID(req, res) {
    try{
        const student_id = parseInt(req.query.student_id )
        const category_id = parseInt(req.query.category_id )
        const session = await SessionHistory.getByStudentIDCategoryID(student_id, category_id)
        res.status(200).json(session)
    } catch (err) {
        res.status(404).json({"error":err.message})
    }
}

module.exports = {
    allSessions, 
    create, 
    sessionsByID, 
    sessionsByStudentID, 
    getStudentSessionByScore, 
    getStudentSessionByTimeTaken,
    getByStudentIDCategoryID
}