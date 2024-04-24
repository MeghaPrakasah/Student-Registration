import React, { useState } from 'react';
import './AddStudentsPage.css';
import addIcon from './plus.png';
import removeIcon from './delete-button.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudentsPage = () => {
  const [students, setStudents] = useState([{ name: '', id: '', phone: '', phoneError: '' }]);
  const [usedIds, setUsedIds] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (index, field, value) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  const handleAddStudent = () => {
    setStudents([...students, { name: '', id: '', phone: '', phoneError: '' }]);
  };

  const handleRemoveStudent = index => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const handleSubmit = async () => {
    try {
      for (const student of students) {
        const response = await axios.post('http://localhost:5000/api/students', student);
        console.log('Student created:', response.data);
      }
      setShowMessage(true); // Show the message after submitting
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleIdChange = (index, value) => {
    const newStudents = [...students];
    newStudents[index].id = value;
    setStudents(newStudents);

    if (usedIds.includes(value)) {
      newStudents[index].idError = 'ID already exists';
    } else {
      newStudents[index].idError = '';
    }
  };

  const handlePhoneChange = async (index, value) => {
    const newStudents = [...students];
    newStudents[index].phone = value;
    setStudents(newStudents);
  
    // Phone number validation
    if (!/^\d{10}$/.test(value)) {
      newStudents[index].phoneError = 'Phone number must be 10 digits';
    } else {
      await validatePhone(value, index); // Call the validatePhone function
  
      // Check if the phone number is used in other input boxes
      const usedPhoneNumbers = newStudents.map((student, i) => (i !== index ? student.phone : null));
      if (usedPhoneNumbers.includes(value)) {
        newStudents[index].phoneError = 'Phone number already used';
      } else {
        newStudents[index].phoneError = ''; // Clear error if the phone number is not used in other input boxes
      }
    }
  };
  

  const validatePhone = async (phoneNumber, index) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/check-phone/${phoneNumber}`);
      const exists = response.data.exists;
      if (exists) {
        const newStudents = [...students];
        newStudents[index].phoneError = "Phone number already exists";
        setStudents(newStudents);
        toast.error("Phone number already exists");
      } else {
        const newStudents = [...students];
        newStudents[index].phoneError = '';
        setStudents(newStudents);
      }
    } catch (error) {
      console.error("Error validating phone number:", error);
      toast.error("Error validating phone number");
    }
  };

  const handleBlur = (index) => {
    const idValue = students[index].id;
    if (idValue) {
      setUsedIds([...usedIds, idValue]);
    }
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <br />
      {students.map((student, index) => (
        <div key={index} className="student-row">
          <input
            type="text"
            placeholder="Name"
            value={student.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="ID"
            value={student.id}
            onChange={(e) => handleIdChange(index, e.target.value)}
            onBlur={() => handleBlur(index)}
          />
          {student.idError && <div className="error">{student.idError}</div>}
          <input
            type="text"
            placeholder="Phone"
            value={student.phone}
            onChange={(e) => handlePhoneChange(index, e.target.value)}
          />
          {student.phoneError && <div className="error">{student.phoneError}</div>}
          {index === 0 && (
            <img src={addIcon} alt="Add" className="add" onClick={handleAddStudent} />
          )}
          {index > 0 && (
            <img src={removeIcon} alt="Remove" className="remove" onClick={() => handleRemoveStudent(index)} />
          )}
        </div>
      ))}
      <br />
      <div className="center">
        <button className="submit-button" onClick={handleSubmit}>Save</button>
        {showMessage && <div className="message">Details saved successfully!</div>}
        &nbsp;<br /><br />
        <div className="view-link">
          <Link to="/view-details" className="view-button">View</Link>
        </div>
      </div>
    </div>
  );
}

export default AddStudentsPage;
