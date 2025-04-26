// Creating the table for rendering in react app

import React, { useState, useEffect} from "react";
import '../App.css';

const AssignmentTable = () => {
    const [assignments, setAssignments] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'project_name', direction: 'desc'})

    // Fetching the assignemnt to populate the table
    const fetchAssignment = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/project_assignments')
            const data = await res.json();
            setAssignments(data);
        } catch (err) {
            console.error("Fetch error: ", err);
        }
    }

    //  Function to calling the fetching the assignment at an interval
    useEffect(() =>{
        fetchAssignment();
        const interval = setInterval(fetchAssignment, 60000);
        return () => clearInterval(interval);
    }, []);

    // Making sure to copy the array so not to change to original and set up the sorting 
    const sortedAssignments = [...assignments].sort((a,b) => {
        const key = sortConfig.key;
        const direction = sortConfig.direction === 'asc' ? 1 : -1;

        if (a[key] < b[key]) return -1 * direction;
        if (a[key] > b[key]) return 1 * direction;
        return 0; 
    });

    // Function to be able to call the soirt when clicked on 
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc'){
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Html for building the page to show the table of assignment
    return(
        <div className='container'>
            <h1>5 Latest Project Assignments:</h1>
            <table border='1'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('employee_id')}>Employee ID:</th>
                        <th onClick={() => handleSort('employee_name')}>Employee Name: </th>
                        <th onClick={() => handleSort('project_name')}>Project Name: </th>
                        <th onClick={() => handleSort('start_date')}>Start Date: </th>
                    </tr>
                </thead>
                <tbody> 
                    {sortedAssignments.slice(0,5).map((assignment, index) => (
                        <tr key={index}>
                            <td>{assignment.employee_id ?? 'N/A'}</td>
                            <td>{assignment.employee_name ?? 'N/A'}</td>
                            <td>{assignment.project_name ?? 'N/A'}</td>
                            <td>{assignment.start_date ? new Date(assignment.start_date).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignmentTable;