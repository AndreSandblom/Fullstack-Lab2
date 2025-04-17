const ProjectAssignment = require('../models/ProjectAssignment');
const Employee = require('../models/Employee');
const Project = require('../models/Project');

const addAssignment = async (req, res) => {
    try {
        const { employee_id, project_code, start_date} = req.body;

        const employee = await Employee.findOne({ employee_id });
        if(!employee) {
            return res.status(404).json({message: "Employee ID doesnt exist."})
        }

        const project = await Project.findOne({ project_code });
        if(!project) {
            return res.status(404).json({message: "Project Id doesnt exist."})
        }

        const newAssignment = new ProjectAssignment({
            employee_id,
            project_code,
            start_date
        });
        
        await newAssignment.save();
        res.status(201).json(newAssignment);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Something went wrong:",error});
    }
}

const getAssignment = async (req, res) => {
    try {

        const assignments = await ProjectAssignment.find()

        res.status(200).json(assignments);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong: ", error});
    }
}

module.exports = {
    addAssignment,
    getAssignment
};