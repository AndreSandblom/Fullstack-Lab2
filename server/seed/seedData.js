const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');
require('dotenv').config();

const employees = [
    {employee_id: 101, full_name: "Tally Coent", email: "taco@madeup.com",hashed_password: "realhashedpassword1"},
    {employee_id: 102, full_name: "George Terte", email: "gete@madeup.com",hashed_password: "realhashedpassword2"},
    {employee_id: 103, full_name: "Jessica Nuern", email: "jenu@madeup.com",hashed_password:"realhashedpassword3"},
    {employee_id: 104, full_name: "Jon Qwerty", email: "joqw@madeup.com",hashed_password:"realhashedpassword4"},
    {employee_id: 105, full_name: "Susan Outny", email: "suou@madeup.com",hashed_password:"realhashedpassword5"},
]

const projects = [
    { project_code: 1, project_name: "Wall Paint",project_description:"Paint the wall blue, like really blue."},
    { project_code: 2, project_name: "Fix Fence",project_description:"Rebuild the fence that is broken."},
    { project_code: 3, project_name: "Lawn Mowing",project_description:"Mowing down the lawn till its clean mowed."},
    { project_code: 4, project_name: "Build Driveway",project_description:"Build a driveway for cars to drive in on."},
    { project_code: 5, project_name: "Relaxation",project_description:"Make sure to relax when all the other project are done."}
]

const seedDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_STRING)
        await Employee.deleteMany({})
        await Project.deleteMany({})
        await ProjectAssignment.deleteMany({})

        const insertEmp = await Employee.insertMany(employees);
        const insertProj = await Project.insertMany(projects);
        
        const assignments = insertEmp.map((empl,index) => ({
            employee_id: empl._id,
            project_code: insertProj[index]._id,
            start_date: new Date()
        }));

        await ProjectAssignment.insertMany(assignments);

        console.log("Seed completed succesfully.")
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();