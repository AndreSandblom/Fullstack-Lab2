const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

router.post('/', projectController.addProject);

module.exports = router;