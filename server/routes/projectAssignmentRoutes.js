const express = require('express');
const router = express.Router();
const projectAssignmentController = require('../controller/projectAssignmentController')

router.get('/', projectAssignmentController.getAssignment);
router.post('/', projectAssignmentController.addAssignment);

module.exports = router;