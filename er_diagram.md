# Database Entity-Relationship (ER) Diagram

This diagram visualizes the structure and relationships of all tables in your SQLite database.

```mermaid
erDiagram
    %% Core Entities
    STUDENTS {
        varchar id PK "Student ID (e.g., S601)"
        varchar password
        varchar name
        int class
        varchar section
        int roll_no
    }

    TEACHERS {
        varchar user_id PK "Faculty ID (e.g., T101)"
        varchar password
        varchar name
        varchar course
        varchar email
    }

    %% Attendance System
    ATTENDANCE_SESSIONS {
        int session_id PK
        varchar teacher_id FK
        int for_class
        varchar for_section
        date date_created
        varchar secret_code
    }

    ATTENDANCE_RECORDS {
        int id PK
        int session_id FK
        varchar student_id FK
        varchar status "Present/Absent"
        timestamp marked_at
    }

    %% Academic Resources
    COURSE_NOTES {
        int id PK
        varchar teacher_id FK
        int target_class
        varchar subject_domain
        varchar file_path
        varchar original_name
        timestamp upload_date
    }

    %% Assignment LMS
    TEACHER_TASKS {
        int id PK
        varchar teacher_id FK
        int target_class
        varchar type "Homework/Assignment/Update"
        varchar title
        text description
        varchar file_path
        varchar original_name
        date due_date
        timestamp created_at
    }

    STUDENT_SUBMISSIONS {
        int id PK
        int task_id FK
        varchar student_id FK
        varchar file_path
        varchar original_name
        text notes
        varchar status
        timestamp submitted_at
    }

    %% Gradebook Matrix
    MARKS {
        int id PK
        varchar student_id FK
        varchar teacher_id FK
        varchar subject
        varchar examination_name
        date date_of_exam
        int marks_obtained
    }

    %% Relationships
    TEACHERS ||--o{ ATTENDANCE_SESSIONS : "generates"
    TEACHERS ||--o{ COURSE_NOTES : "uploads"
    TEACHERS ||--o{ TEACHER_TASKS : "publishes"
    TEACHERS ||--o{ MARKS : "grades"

    STUDENTS ||--o{ ATTENDANCE_RECORDS : "marks"
    STUDENTS ||--o{ STUDENT_SUBMISSIONS : "submits"
    STUDENTS ||--o{ MARKS : "receives"

    ATTENDANCE_SESSIONS ||--o{ ATTENDANCE_RECORDS : "contains"
    TEACHER_TASKS ||--o{ STUDENT_SUBMISSIONS : "collects"
```

## Relationship Legend:

- `||--o{` : **One-to-Many**. (E.g., One Teacher can publish Many Teacher Tasks).
- **PK**: Primary Key (Unique identifier for the row).
- **FK**: Foreign Key (Reference to a Primary Key in another table).

## Core Systems Breakdown:

1. **Identity & Authentication**: The `STUDENTS` and `TEACHERS` tables form the backbone. Every other table ties back to these users.
2. **Attendance Protocol**: A multi-step process where `TEACHERS` open an `ATTENDANCE_SESSION`, and `STUDENTS` log specific `ATTENDANCE_RECORDS` validating against that specific session ID and code.
3. **LMS & Assignments Tracking**: `TEACHER_TASKS` act as the master broadcast node targeting specific classes. `STUDENT_SUBMISSIONS` acts as the securely mapped receiver, requiring both a valid `task_id` and `student_id` to exist securely. If the core Task is deleted via `fs.unlink`, the database cascades the wipe downward.
4. **Academics Core**: Both the `COURSE_NOTES` and `MARKS` tables establish simple one-way streams linking the Teacher's inputs directly to the filtered Student data queries (isolated by `target_class` or specific `student_id`).
