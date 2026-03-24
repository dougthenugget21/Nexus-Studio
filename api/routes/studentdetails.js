const { Router } = require('express');

const studentController = require('../controller/studentdetails');

const studentRouter = Router();

studentRouter.post("/create", studentController.createStudent);
studentRouter.post("/login", studentController.getStudentByEmail);

module.exports = studentRouter;