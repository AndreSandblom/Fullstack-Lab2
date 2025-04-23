import React, { useState, useEffect} from "react";
import '../App.css';

const AssignmentTable = () => {
    const [assignments, setAssignments] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'project_name', direction: 'desc'})

    const fetchAssignment = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/project_assignments')
            const data = await res.json();
            console.log("Fetched data:", data);
            setAssignments(data);
        } catch (err) {
            console.error("Fetch error: ", err);
        }
    }

    useEffect(() =>{
        console.log("Running fetchAssignment...");
        fetchAssignment();
        const interval = setInterval(fetchAssignment, 60000);
        return () => clearInterval(interval);
    }, []);

    const sortedAssignments = [...assignments].sort((a,b) => {
        const key = sortConfig.key;
        const direction = sortConfig.direction === 'asc' ? 1 : -1;

        if (a[key] < b[key]) return -1 * direction;
        if (a[key] > b[key]) return 1 * direction;
        return 0; 
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc'){
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
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