import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/studentForm';

function StudentFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div>
      <StudentForm studentId={id} onSuccess={handleSuccess} />
    </div>
  );
}

export default StudentFormPage;
