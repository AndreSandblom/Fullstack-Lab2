const mongoose = require('mongoose');

// Model for Projects

const ProjectSchema = new mongoose.Schema({
    project_code: { type: Number, required: true, unique: true},
    project_name: { type: String, required: true },
    project_description: { type: String },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
