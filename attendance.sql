-- Database schema for managing automated student attendance
CREATE TABLE IF NOT EXISTS attendance_sessions (
    session_id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id VARCHAR(10) NOT NULL,
    for_class INT NOT NULL,
    for_section VARCHAR(2) NOT NULL,
    date_created DATE NOT NULL,
    secret_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(teacher_id) REFERENCES teachers(user_id)
);

CREATE TABLE IF NOT EXISTS attendance_records (
    record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    student_id VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'Absent',
    marked_at TIMESTAMP,
    FOREIGN KEY(session_id) REFERENCES attendance_sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY(student_id) REFERENCES students(id)
);
