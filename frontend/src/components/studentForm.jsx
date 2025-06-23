import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent, fetchStudentById } from '../services/api';
import Swal from 'sweetalert2';

function StudentForm({ studentId, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', age: '', gender: '' });
  const [marks, setMarks] = useState({ Math: '', English: '', Science: '' });

  const loadStudent = async () => {
    try {
      if (studentId) {
        const res = await fetchStudentById(studentId);
        setForm({
          name: res.name,
          email: res.email,
          age: res.age,
          gender: res.gender,
        });

        const marksMap = {};
        res.marks.forEach(mark => {
          marksMap[mark.subject] = mark.marks_obtained;
        });
        setMarks(marksMap);
      }
    } catch (error) {
      console.error('Failed to fetch student:', error);
      Swal.fire('Error', error.message || 'Failed to fetch student data', 'error');
    }
  };

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMarkChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const markArray = ['Math', 'English', 'Science'].map(subject => ({
      subject,
      score: parseInt(marks[subject] || 0),
    }));

    try {
      if (studentId) {
        await updateStudent(studentId, { ...form, marks: markArray });
        Swal.fire('Success', 'Student updated successfully!', 'success');
      } else {
        await createStudent({ ...form, marks: markArray });
        Swal.fire('Success', 'Student created successfully!', 'success');
      }

      onSuccess();
      setForm({ name: '', email: '', age: '', gender: '' });
      setMarks({ Math: '', English: '', Science: '' });
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 row">
        <h3>{studentId ? 'Edit Student' : 'Add Student'}</h3>
        
        <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                id="name"
                className="form-control"
                name="name"
                value={form?.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
            />
            </div>

            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                id="email"
                className="form-control"
                name="email"
                value={form?.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
            />
            </div>

            <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
                id="age"
                className="form-control"
                name="age"
                value={form?.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
            />
            </div>

            <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
                id="gender"
                className="form-control"
                name="gender"
                value={form?.gender}
                onChange={handleChange}
                required
            >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
            </select>
            </div>
        </div>

        <div className="col-md-6">
            <h5>Marks</h5>
            {['Math', 'English', 'Science'].map(subject => (
            <div className="mb-3" key={subject}>
                <label htmlFor={subject} className="form-label">{subject} Marks</label>
                <input
                id={subject}
                className="form-control"
                type="number"
                name={subject}
                value={marks[subject] || ''}
                onChange={handleMarkChange}
                placeholder={`Enter ${subject} marks`}
                min="0"
                max="100"
                required
                />
            </div>
            ))}
        </div>

        <div className="col-12">
            <button className="btn btn-success mt-2" type="submit">
            {studentId ? 'Update Student' : 'Add Student'}
            </button>
        </div>
    </form>

  );
}

export default StudentForm;
