-- Database schema for managing student marks
CREATE TABLE IF NOT EXISTS marks (
    record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id VARCHAR(10) NOT NULL,
    teacher_id VARCHAR(10) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    examination_name VARCHAR(150) NOT NULL,
    date_of_exam DATE NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL,
    total_marks DECIMAL(5,2) DEFAULT 100.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(teacher_id) REFERENCES teachers(user_id)
);
