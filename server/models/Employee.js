const mongoose = require('mongoose');

// Model for Employee 

const EmployeeSchema = new mongoose.Schema({
    employee_id:{ type: Number, required: true, unique: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    hashed_password: { type: String, required: true }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;