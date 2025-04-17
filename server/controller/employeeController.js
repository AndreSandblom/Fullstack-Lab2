const Employee = require('../models/Employee');

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