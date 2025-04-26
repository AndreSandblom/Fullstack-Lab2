const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

// Routes for Employees

router.post('/', employeeController.addEmployee);

module.exports = router;