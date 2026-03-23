const express = require('express');
const cors = require('cors');

const studentDetailsRouter = require('./routes/studentdetails');

const api = express();

api.use(cors());
api.use(express.json());

api.use("/studentdata", studentDetailsRouter);

module.exports = api;