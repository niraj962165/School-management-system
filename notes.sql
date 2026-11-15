-- Database schema for managing securely uploaded course notes
CREATE TABLE IF NOT EXISTS course_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id VARCHAR(10) NOT NULL,
    target_class INT NOT NULL,
    subject_domain VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(teacher_id) REFERENCES teachers(user_id)
);
