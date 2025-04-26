const ProjectAssignment = require('../models/ProjectAssignment');
const Employee = require('../models/Employee');
const Project = require('../models/Project');

// File for creating and getting assignemnt

//Function to add a new assignemnt

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

// Function to get all the assignment, using populate (new but avoids the manual joining)

const getAssignment = async (req, res) => {
    try {

        const assignments = await ProjectAssignment.find()
            .populate('employee_id', 'employee_id full_name email')
            .populate('project_code', 'project_name project_description')

        const formatAssign = assignments.map((assignment) => ({
            employee_id: assignment.employee_id.employee_id,
            employee_name: assignment.employee_id.full_name,
            project_name: assignment.project_code.project_name,
            start_date: assignment.start_date,
        }));

        res.status(200).json(formatAssign);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong: ", error});
    }
}

module.exports = {
    addAssignment,
    getAssignment
};