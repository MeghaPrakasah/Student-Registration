const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Route to get all students
router.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/checkPhone/:phoneNumber', async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  try {
      const existingStudent = await StudentModel.findOne({ phone: phoneNumber });
      const phoneNumberExists = !!existingStudent;
      res.json({ exists: phoneNumberExists });
  } catch (error) {
      console.error("Phone Number Already Registered:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a new student
router.post('/api/students', async (req, res) => {
  try {
    const { name, id, phone } = req.body;
    const existingStudent = await Student.findOne({ phone });
    if (existingStudent) {
      return res.status(400).json({ message: 'Phone number must be unique' });
    }
    const newStudent = new Student({ name, id, phone });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
