const Project = require('../models/Project')

// Controller file fo Projects
// Function to be able to route a for the creation of a new Projects (obs, not used yet)

const addProject = async (req,res) => {
    try {
        const newProject = req.body;

        const checkProject = await Project.findOne({ project_code: newProject.project_code });
        if (checkProject) {
            return res.status(409).json({ message: "Project ID already exist." });
        }

        const project = new Project(newProject);
        await project.save();

        res.status(201).json(project);
    } catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong", error});
    }
}

module.exports = {
    addProject
};