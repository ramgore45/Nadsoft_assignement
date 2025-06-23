const pool = require('../config/db');

exports.createStudent = async (data) => {
  const { name, email, age, gender, marks } = data;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      'INSERT INTO students (name, email, age, gender) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, age, gender]
    );

    const student = result.rows[0];

    if (marks && Array.isArray(marks)) {
      for (const { subject, score } of marks) {
        const mark = await client.query(
          'INSERT INTO marks (student_id, subject, marks_obtained) VALUES ($1, $2, $3)',
          [student.id, subject, score]
        );
      }
    }

    await client.query('COMMIT');
    return student;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.getAllStudents = async (limit, offset) => {
  const result = await pool.query('SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
  return result.rows;
};

exports.getTotalCount = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM students');
  return parseInt(result.rows[0].count);
};

exports.getStudentById = async (id) => {
  const studentResult = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

  if (studentResult.rows.length === 0) {
    throw new Error('Student not found');
  }

  const marksResult = await pool.query('SELECT * FROM marks WHERE student_id = $1', [id]);

  const studentData = studentResult.rows[0];
  studentData.marks = marksResult.rows;

  return studentData;
};

exports.updateStudent = async (id, data) => {
  const { name, email, age, gender, marks } = data;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      'UPDATE students SET name=$1, email=$2, age=$3, gender=$4 WHERE id=$5 RETURNING *',
      [name, email, age, gender, id]
    );

    const student = result.rows[0];

    if (marks && Array.isArray(marks)) {
      for (const mark of marks) {
        if (mark.id) {
          await client.query(
            'UPDATE marks SET subject = $1, marks_obtained = $2 WHERE id = $3',
            [mark.subject, mark.score, mark.id]
          );
        } else {
          await client.query(
            'INSERT INTO marks (student_id, subject, marks_obtained) VALUES ($1, $2, $3)',
            [id, mark.subject, mark.score]
          );
        }
      }
    }

    await client.query('COMMIT');
    return student;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.deleteStudent = async (id) => {
  await pool.query('DELETE FROM students WHERE id=$1', [id]);
};
