const  mongoose = require('mongoose');

const ProjectAssignmentSchema = new mongoose.Schema({
    employee_id: { type: Number, required: true},
    project_code: { type: Number, required: true},
    start_date: { type: Date, default: Date.now }
});

const ProjectAssignment = mongoose.model('ProjectAssignment', ProjectAssignmentSchema);

module.exports = ProjectAssignment;