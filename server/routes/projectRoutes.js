const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

//Routes for Projects

router.post('/', projectController.addProject);

module.exports = router;