const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Studentdetails = require('../model/Studentdetails');

async function getStudentByEmail(req, res) {
    try {
        const data = req.body;
        const user= await Studentdetails.getStudentByEmail(data.email);
        if (!user) {
            throw new Error("No user with that email available.")
        }
        const match = await bcrypt.compare(data.password, user.password);
        console.log(match)
        if(match) {
            const payload = {username: user.email}
            const sendToken = (err, token) => {
                if(err) {
                    throw new Error("Error in token generation")
                }
                res.status(200).json({
                    success:true,
                    token:token,
                    first_name: user.first_name,
                    surname: user.surname,
                    email: user.email,
                    student_id: user.student_id
                });
            }
            jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: 3600}, sendToken);
        }
        else {
            throw new Error("User could not be authenticated")
        }
        
    }
    catch(e) {
        res.status(401).json({error: e.message});
    }
}

async function createStudent(req, res) {
    try {
        const data = req.body;
        //Generate a salt
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        //Hash the password
        data["password"] = await bcrypt.hash(data.password, salt);
        const result = await Studentdetails.createStudent(data);
        res.status(201).send(result);
    }
    catch(e) {
        res.status(401).json({error: e.message}); 
    }
}

module.exports = {
    getStudentByEmail,
    createStudent
}