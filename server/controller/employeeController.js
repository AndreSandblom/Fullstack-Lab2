const Employee = require('../models/Employee');

// Controller file fo Employee
// Function to be able to route a for the creation of a ne employee (obs, not used yet)

const addEmployee = async (req,res) => {
    try {
        const newEmployee = req.body;

        const checkEmployee = await Employee.findOne({employee_id: newEmployee.employee_id});
        if (checkEmployee) {
            return res.status(409).json({message: "Employee ID already exist"});
        }

        const employee = new Employee(newEmployee);
        await employee.save();

        res.status(201).json(employee);
    } catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong", error});
    }
}

module.exports = {
    addEmployee
};