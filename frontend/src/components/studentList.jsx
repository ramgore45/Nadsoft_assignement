import React, { useState, useEffect } from 'react';
import { fetchStudents, deleteStudent } from '../services/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadStudents = async () => {
    try {
      const res = await fetchStudents(page, 5);
      setStudents(res.students);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error('Failed to load students:', error);
      Swal.fire('Error', error.message || 'Failed to load students', 'error');
    }
  };

  useEffect(() => {
    loadStudents();
  }, [page]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the student.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id).then(() => {
          Swal.fire('Deleted!', 'Student record has been deleted.', 'success');
          loadStudents();
        });
      }
    });
  };

  return (
    <div>
      <h2 className="mb-3">Student List</h2>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Member Name</th>
            <th>Member Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length ? students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <Link to={`/edit/${student.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default StudentList;
