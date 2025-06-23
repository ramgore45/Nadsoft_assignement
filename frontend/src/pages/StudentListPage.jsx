import React from 'react';
import { Link } from 'react-router-dom';
import StudentList from '../components/studentList';

function StudentListPage() {
  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add" className="btn btn-success">Add New Member</Link>
      </div>
      <StudentList />
    </div>
  );
}

export default StudentListPage;
