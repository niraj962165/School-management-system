-- Database schema for managing Teacher Assignments and Student Submissions

CREATE TABLE IF NOT EXISTS teacher_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id VARCHAR(10) NOT NULL,
    target_class INT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'Homework', -- "Homework", "Assignment", "Update"
    title VARCHAR(150) NOT NULL,
    description TEXT,
    file_path VARCHAR(255),
    original_name VARCHAR(255),
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(teacher_id) REFERENCES teachers(user_id)
);

CREATE TABLE IF NOT EXISTS student_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    student_id VARCHAR(10) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Pending Review', -- "Pending Review", "Graded"
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(task_id) REFERENCES teacher_tasks(id),
    FOREIGN KEY(student_id) REFERENCES students(id)
);
