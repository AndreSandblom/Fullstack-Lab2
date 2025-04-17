const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

router.post('/', employeeController.addEmployee);

module.exports = router;