import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentListPage from './pages/StudentListPage';
import StudentFormPage from './pages/StudentFormPage';

function App() {

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Student Management</h1>
        <Routes>
          <Route path="/" element={<StudentListPage />} />
          <Route path="/add" element={<StudentFormPage />} />
          <Route path="/edit/:id" element={<StudentFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
