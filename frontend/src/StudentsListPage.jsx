import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentsListPage.css'


const StudentsListPage = () => {
  const [studentDetails, setStudentDetails] = useState([]);

    useEffect(() => {
        // Fetch student details from the backend when the component mounts
        fetchStudentDetails();
    }, []);

    const fetchStudentDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudentDetails(response.data);
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    return (
        <div>
            <h2>Student Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {studentDetails.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.id}</td>
                            <td>{student.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
  

export default StudentsListPage;
