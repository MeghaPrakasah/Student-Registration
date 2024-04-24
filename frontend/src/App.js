import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStudentsPage from './AddStudentsPage';
import StudentsListPage from './StudentsListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddStudentsPage />} />
        <Route path="/view-details" element={<StudentsListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
