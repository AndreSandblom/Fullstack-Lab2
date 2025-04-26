const express = require('express');
const router = express.Router();
const projectAssignmentController = require('../controller/projectAssignmentController')

// Routes for Assignemnt

router.get('/', projectAssignmentController.getAssignment);
router.post('/', projectAssignmentController.addAssignment);

module.exports = router;