const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = 5000;

// Setup Multer for secure file uploads maintaining natural file extensions
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const upload = multer({ storage: storage });
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files securely leveraging express.static locally
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve all static frontend HTML/CSS/JS files cleanly
app.use(express.static(path.join(__dirname))); 

// ==== Initialize Database Connection ====
const dbPath = path.join(__dirname, 'school.db');
const sqlFilePath = path.join(__dirname, 'database.sql');
const marksSqlFilePath = path.join(__dirname, 'marks.sql');
const attendanceSqlFilePath = path.join(__dirname, 'attendance.sql');
const notesSqlFilePath = path.join(__dirname, 'notes.sql');
const assignmentsSqlFilePath = path.join(__dirname, 'assignments.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("🟢 Connected to the SQLite database successfully.");
        
        // Ensure strictly auto-populated with the SQL file
        const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
        const marksSqlScript = fs.existsSync(marksSqlFilePath) ? fs.readFileSync(marksSqlFilePath, 'utf8') : '';
        const attSqlScript = fs.existsSync(attendanceSqlFilePath) ? fs.readFileSync(attendanceSqlFilePath, 'utf8') : '';
        const notesSqlScript = fs.existsSync(notesSqlFilePath) ? fs.readFileSync(notesSqlFilePath, 'utf8') : '';
        const assignmentsSqlScript = fs.existsSync(assignmentsSqlFilePath) ? fs.readFileSync(assignmentsSqlFilePath, 'utf8') : '';
        
        // Execute the database.sql massive multi-statement script natively
        db.exec(sqlScript, (err) => {
            if(err) console.warn("SQL setup warning:", err.message);
            else console.log("🟢 Core SQL records initialized securely.");
            
            // Execute marks setup
            if(marksSqlScript) {
                db.exec(marksSqlScript, (err2) => {
                    if(err2) console.warn("Marks Setup warning:", err2.message);
                    else console.log("🟢 Marks tracking SQL records initialized securely.");
                });
            }
            if(attSqlScript) {
                db.exec(attSqlScript, (err3) => {
                    if(err3) console.warn("Attendance Setup warning:", err3.message);
                    else console.log("🟢 Attendance tracking SQL records initialized securely.");
                });
            }
            if(notesSqlScript) {
                db.exec(notesSqlScript, (err4) => {
                    if(err4) console.warn("Notes Setup warning:", err4.message);
                    else console.log("🟢 Notes retrieval SQL records initialized securely.");
                });
            }
            if(assignmentsSqlScript) {
                db.exec(assignmentsSqlScript, (err5) => {
                    if(err5) console.warn("Assignments Setup warning:", err5.message);
                    else console.log("🟢 LMS Assignment SQL records initialized securely.");
                });
            }
            
            db.run(`CREATE TABLE IF NOT EXISTS password_changes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                user_role TEXT,
                change_date TEXT
            )`, (err) => {
                if(!err) console.log("🟢 Password change log table verified.");
            });
        });
    }
});

// ==== Initialize Admin Database Connection ====
const adminDbPath = path.join(__dirname, 'admin.db');
const adminDb = new sqlite3.Database(adminDbPath, (err) => {
    if (err) {
        console.error("Error opening admin database:", err.message);
    } else {
        console.log("🟢 Connected to the Admin SQLite database successfully.");
        // Create table and insert default admin if not exists
        adminDb.run(`CREATE TABLE IF NOT EXISTS admin_users (
            id TEXT PRIMARY KEY,
            name TEXT,
            password TEXT
        )`, (err) => {
            if (!err) {
                
                const checkSql = `SELECT * FROM admin_users WHERE id = 'admin123'`;
                adminDb.get(checkSql, (err, row) => {
                    if (!row) {
                        adminDb.run(`INSERT INTO admin_users (id, name, password) VALUES ('admin123', 'admin', 'admin123')`);
                        console.log("🟢 Default Admin user created: ID: admin123, Pass: admin123");
                    }
                });
            }
            adminDb.run(`CREATE TABLE IF NOT EXISTS admin_password_changes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                change_date TEXT
            )`, (err) => {
                if(!err) console.log("🟢 Admin password change log table verified.");
            });
        });
    }
});

// ==== Admin Authentication API Route ====
app.post('/api/login/admin', (req, res) => {
    const { loginId, password } = req.body;

    if(!loginId || !password) {
        return res.status(400).json({ success: false, message: 'ID and password are strictly required.' });
    }

    const query = `SELECT * FROM admin_users WHERE id = ?`;
    
    adminDb.get(query, [loginId], (err, row) => {
        if(err) {
            console.error("Admin Database query error:", err);
            return res.status(500).json({ success: false, message: 'Internal server error processing Admin DB.' });
        }

        if(!row) {
            return res.status(401).json({ success: false, message: 'We could not find that Admin ID in our active roster.' });
        }

        if(row.password === password) {
            return res.json({ 
                success: true, 
                message: 'Login successful!', 
                admin: { 
                    id: row.id, 
                    name: row.name 
                }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect password provided. Please verify credentials.' });
        }
    });
});

// ==== Student Authentication API Route ====
app.post('/api/login/student', (req, res) => {
    const { loginId, password } = req.body;

    if(!loginId || !password) {
        return res.status(400).json({ success: false, message: 'ID and password are strictly required.' });
    }

    // Query DB securely avoiding pure injection risks via parameter substitution
    const query = `SELECT * FROM students WHERE id = ?`;
    
    db.get(query, [loginId], (err, row) => {
        if(err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: 'Internal server error processing DB.' });
        }

        if(!row) {
            return res.status(401).json({ success: false, message: 'We could not find that Student ID in our active roster.' });
        }

        // Verify password natively strictly from the SQL record fetched
        if(row.password === password) {
            return res.json({ 
                success: true, 
                message: 'Login successful!', 
                student: { 
                    id: row.id, 
                    name: row.name, 
                    class: row.class,
                    section: row.section,
                    rollNo: row.roll_no
                }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect password provided. Please verify credentials.' });
        }
    });
});

// ==== Teacher Authentication API Route ====
app.post('/api/login/teacher', (req, res) => {
    const { loginId, password } = req.body;

    if(!loginId || !password) {
        return res.status(400).json({ success: false, message: 'ID and password are strictly required.' });
    }

    const query = `SELECT * FROM teachers WHERE user_id = ?`;
    
    db.get(query, [loginId], (err, row) => {
        if(err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: 'Internal server error processing DB.' });
        }

        if(!row) {
            return res.status(401).json({ success: false, message: 'We could not find that Faculty ID in our active roster.' });
        }

        if(row.password === password) {
            return res.json({ 
                success: true, 
                message: 'Login successful!', 
                teacher: { 
                    id: row.user_id, 
                    name: row.name, 
                    course: row.course,
                    email: row.email
                }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect password provided. Please verify credentials.' });
        }
    });
});

// ==== Faculty Action API Routes ====
// 1. Generate Attendance Code
app.post('/api/attendance/generate', (req, res) => {
    const { teacherId, targetClass, targetSection } = req.body;
    
    if(!targetClass || !targetSection) return res.status(400).json({ success: false, message: 'Class and Section required.' });

    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const dateToday = new Date().toISOString().split('T')[0];

    db.run(
        `INSERT INTO attendance_sessions (teacher_id, for_class, for_section, date_created, secret_code) VALUES (?, ?, ?, ?, ?)`,
        [teacherId, targetClass, targetSection, dateToday, pin],
        function (err) {
            if (err) return res.status(500).json({ success: false, message: 'DB Error inserting session.' });
            
            const sessionId = this.lastID;
            
            // Auto-populate 'Absent' records for all students in that class/section
            db.all(`SELECT id FROM students WHERE class = ? AND section = ?`, [targetClass, targetSection], (err2, students) => {
                if (err2) return res.status(500).json({ success: false, message: 'Failed to fetch students.' });
                
                if (students.length > 0) {
                    const placeholders = students.map(() => '(?, ?, ?)').join(',');
                    const values = [];
                    students.forEach(s => values.push(sessionId, s.id, 'Absent'));
                    
                    db.run(`INSERT INTO attendance_records (session_id, student_id, status) VALUES ${placeholders}`, values, (err3) => {
                        if (err3) console.warn("Error inserting default absent records:", err3.message);
                    });
                }
                res.json({ success: true, pin, sessionId, message: 'Code generated securely' });
            });
        }
    );
});

// 1.5. Student Mark Attendance
app.post('/api/attendance/mark', (req, res) => {
    const { studentId, code } = req.body;
    const dateToday = new Date().toISOString().split('T')[0];

    // Find the session for today with that code
    db.get(`SELECT session_id FROM attendance_sessions WHERE date_created = ? AND secret_code = ?`, [dateToday, code], (err, session) => {
        if (err || !session) return res.status(400).json({ success: false, message: 'Invalid or expired code.' });
        
        // Update their record
        db.run(`UPDATE attendance_records SET status = 'Present', marked_at = CURRENT_TIMESTAMP WHERE session_id = ? AND student_id = ?`, 
            [session.session_id, studentId], function(err2) {
                if(err2) return res.status(500).json({ success: false, message: 'Database error.' });
                if(this.changes === 0) return res.status(400).json({ success: false, message: 'You are not enrolled in this session.' });
                
                res.json({ success: true, message: 'Attendance marked successfully!' });
        });
    });
});

// 1.6 Student Fetch Attendance Stats
app.get('/api/attendance/stats/:studentId', (req, res) => {
    const { studentId } = req.params;
    db.all(`SELECT status, COUNT(*) as count FROM attendance_records WHERE student_id = ? GROUP BY status`, [studentId], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        
        let present = 0, absent = 0;
        rows.forEach(r => {
            if(r.status === 'Present') present = r.count;
            if(r.status === 'Absent') absent = r.count;
        });
        
        res.json({ success: true, stats: { present, absent } });
    });
});

// 1.7 Teacher Fetch Session Attendance
app.get('/api/attendance/session/:sessionId/present', (req, res) => {
    const { sessionId } = req.params;
    db.all(`SELECT s.name, s.id FROM attendance_records r JOIN students s ON r.student_id = s.id WHERE r.session_id = ? AND r.status = 'Present'`, [sessionId], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        res.json({ success: true, students: rows });
    });
});

// 2. Upload Notes (Domain & Class based)
app.post('/api/notes/upload', upload.single('noteDocument'), (req, res) => {
    const { teacherId, targetClass, teacherDomain } = req.body;
    
    if(!req.file || !teacherId || !targetClass || !teacherDomain) {
        return res.status(400).json({success: false, message: 'All fields including File, Class, and Domain are strictly required.'});
    }

    const filePath = `/uploads/${req.file.filename}`;
    const originalName = req.file.originalname;

    db.run(
        `INSERT INTO course_notes (teacher_id, target_class, subject_domain, file_path, original_name) VALUES (?, ?, ?, ?, ?)`,
        [teacherId, targetClass, teacherDomain, filePath, originalName],
        function (err) {
            if(err) {
                console.error("Note upload DB error", err);
                return res.status(500).json({ success: false, message: 'Database failure during upload log.' });
            }
            res.json({ success: true, message: `Notes safely published for Class ${targetClass} in ${teacherDomain}` });
        }
    );
});

// 2.5 Retrieve Notes for isolated Student Class
app.get('/api/notes/:classId', (req, res) => {
    const { classId } = req.params;
    
    // Join with teachers table to retrieve actual teacher name securely
    const query = `
        SELECT c.id, c.subject_domain, c.file_path, c.original_name, c.upload_date, t.name as teacher_name
        FROM course_notes c
        JOIN teachers t ON c.teacher_id = t.user_id
        WHERE c.target_class = ?
        ORDER BY c.upload_date DESC
    `;
    
    db.all(query, [classId], (err, rows) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, notes: rows });
    });
});

// ==== 3. Assignments LMS Architecture ====
// 3.1 Faculty Publish Task
app.post('/api/assignments/publish', upload.single('taskDocument'), (req, res) => {
    const { teacherId, targetClass, type, title, description, dueDate } = req.body;
    
    if(!teacherId || !targetClass || !title) return res.status(400).json({success: false, message: 'Core fields missing.'});
    
    let filePath = null, originalName = null;
    if(req.file) {
        filePath = `/uploads/${req.file.filename}`;
        originalName = req.file.originalname;
    }

    db.run(
        `INSERT INTO teacher_tasks (teacher_id, target_class, type, title, description, file_path, original_name, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [teacherId, targetClass, type || 'Homework', title, description, filePath, originalName, dueDate],
        function (err) {
            if(err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, message: `Task strictly published to Class ${targetClass}` });
        }
    );
});

// 3.2 Student Fetch Active Tasks
app.get('/api/assignments/class/:classId', (req, res) => {
    const { classId } = req.params;
    const query = `
        SELECT t.*, tr.name as teacher_name 
        FROM teacher_tasks t
        JOIN teachers tr ON t.teacher_id = tr.user_id
        WHERE t.target_class = ?
        ORDER BY t.created_at DESC
    `;
    db.all(query, [classId], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        res.json({ success: true, tasks: rows });
    });
});

// 3.3 Student Submit Homework
app.post('/api/assignments/submit', upload.single('submissionDocument'), (req, res) => {
    const { taskId, studentId, notes } = req.body;
    if(!req.file || !taskId || !studentId) return res.status(400).json({success:false, message: 'File is required to submit!'});

    const filePath = `/uploads/${req.file.filename}`;
    const originalName = req.file.originalname;

    db.run(
        `INSERT INTO student_submissions (task_id, student_id, file_path, original_name, notes) VALUES (?, ?, ?, ?, ?)`,
        [taskId, studentId, filePath, originalName, notes],
        function(err) {
            if(err) return res.status(500).json({ success: false });
            res.json({ success: true, message: 'Homework safely deposited alongside ID profile!' });
        }
    );
});

// 3.4 Faculty Retrieve Submissions
app.get('/api/assignments/faculty/submissions', (req, res) => {
    // Relational query connecting tasks, submissions, and identity seamlessly
    const query = `
        SELECT s.id, s.file_path, s.original_name, s.notes, s.submitted_at, 
               t.title, t.target_class, st.name as student_name, st.roll_no, st.section
        FROM student_submissions s
        JOIN teacher_tasks t ON s.task_id = t.id
        JOIN students st ON s.student_id = st.id
        ORDER BY s.submitted_at DESC
    `;
    db.all(query, [], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        res.json({ success: true, submissions: rows });
    });
});

// 3.5 Faculty Fetch Their Own Active Tasks
app.get('/api/assignments/teacher/tasks/:teacherId', (req, res) => {
    db.all(`SELECT * FROM teacher_tasks WHERE teacher_id = ? ORDER BY created_at DESC`, [req.params.teacherId], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        res.json({ success: true, tasks: rows });
    });
});

// 3.6 Faculty Delete Task and Cascade Shred Student Submissions!
app.delete('/api/assignments/task/:taskId', (req, res) => {
    db.get(`SELECT file_path FROM teacher_tasks WHERE id = ?`, [req.params.taskId], (err, row) => {
        if(err) return res.status(500).json({ success: false });
        if(row && row.file_path) {
            const absolutePath = path.join(__dirname, row.file_path);
            if(fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
        }
        db.run(`DELETE FROM teacher_tasks WHERE id = ?`, [req.params.taskId], (err) => {
            if(err) return res.status(500).json({ success: false });
            
            // Force cascade wiping of ALL student submission files that belong to this deleted task!
            db.all(`SELECT file_path FROM student_submissions WHERE task_id = ?`, [req.params.taskId], (errS, subs) => {
                if(subs) {
                    subs.forEach(sub => {
                        if(sub.file_path) {
                            const subPath = path.join(__dirname, sub.file_path);
                            if(fs.existsSync(subPath)) fs.unlinkSync(subPath);
                        }
                    });
                    db.run(`DELETE FROM student_submissions WHERE task_id = ?`, [req.params.taskId]);
                }
            });

            res.json({ success: true, message: 'Core task and all associated submission artifacts definitively shredded.' });
        });
    });
});

// 3.7 Student Fetch Their Past Submissions Secure Vault
app.get('/api/assignments/student/submissions/:studentId', (req, res) => {
    const query = `
        SELECT s.*, t.title as task_title 
        FROM student_submissions s
        JOIN teacher_tasks t ON s.task_id = t.id
        WHERE s.student_id = ?
        ORDER BY s.submitted_at DESC
    `;
    db.all(query, [req.params.studentId], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        res.json({ success: true, submissions: rows });
    });
});

// 3.8 Student Delete (Withdraw) Submission Process
app.delete('/api/assignments/submission/:submissionId', (req, res) => {
    db.get(`SELECT file_path FROM student_submissions WHERE id = ?`, [req.params.submissionId], (err, row) => {
        if(err) return res.status(500).json({ success: false });
        if(row && row.file_path) {
            const absolutePath = path.join(__dirname, row.file_path);
            if(fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
        }
        db.run(`DELETE FROM student_submissions WHERE id = ?`, [req.params.submissionId], (err) => {
            if(err) return res.status(500).json({ success: false });
            res.json({ success: true, message: 'Submission successfully retracted and file forcibly wiped out.' });
        });
    });
});

// 4. Upload Marks to `marks` table
app.post('/api/marks/upload', (req, res) => {
    const { studentId, teacherId, subject, examName, date, marks } = req.body;
    const insertMarks = `INSERT INTO marks (student_id, teacher_id, subject, examination_name, date_of_exam, marks_obtained) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(insertMarks, [studentId, teacherId, subject, examName, date, marks], function(err) {
        if(err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: `Marks uploaded securely for ${studentId} in ${subject}` });
    });
});

// ==== Administrator Management API Routes ====
// Fetch all teachers
app.get('/api/admin/teachers', (req, res) => {
    db.all(`SELECT user_id, name, course, email FROM teachers`, [], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        res.json({ success: true, teachers: rows });
    });
});

// Add a teacher
app.post('/api/admin/teacher', (req, res) => {
    const { user_id, name, course, email, password } = req.body;
    db.run(
        `INSERT INTO teachers (user_id, name, course, email, password) VALUES (?, ?, ?, ?, ?)`,
        [user_id, name, course, email, password],
        function(err) {
            if(err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, message: 'Faculty successfully added.' });
        }
    );
});

// Fetch all students
app.get('/api/admin/students', (req, res) => {
    db.all(`SELECT id, name, class, section, roll_no FROM students`, [], (err, rows) => {
        if(err) return res.status(500).json({ success: false });
        res.json({ success: true, students: rows });
    });
});

// Add a student
app.post('/api/admin/student', (req, res) => {
    const { id, name, student_class, section, roll_no, password } = req.body;
    db.run(
        `INSERT INTO students (id, name, class, section, roll_no, password) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, name, student_class, section, roll_no, password],
        function(err) {
            if(err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, message: 'Student successfully enrolled.' });
        }
    );
});

// ==== Global Password Management Route ====
app.post('/api/change-password', (req, res) => {
    const { userId, role, oldPassword, newPassword } = req.body;
    
    // Determine target DB and Table based on role
    let activeDb = db;
    let authQuery = '';
    let updateQuery = '';
    let logQuery = '';
    
    if(role === 'admin') {
        activeDb = adminDb;
        authQuery = `SELECT * FROM admin_users WHERE id = ?`;
        updateQuery = `UPDATE admin_users SET password = ? WHERE id = ?`;
        logQuery = `INSERT INTO admin_password_changes (user_id, change_date) VALUES (?, datetime('now'))`;
    } else if(role === 'teacher') {
        authQuery = `SELECT * FROM teachers WHERE user_id = ?`;
        updateQuery = `UPDATE teachers SET password = ? WHERE user_id = ?`;
        logQuery = `INSERT INTO password_changes (user_id, user_role, change_date) VALUES (?, 'teacher', datetime('now'))`;
    } else if(role === 'student') {
        authQuery = `SELECT * FROM students WHERE id = ?`;
        updateQuery = `UPDATE students SET password = ? WHERE id = ?`;
        logQuery = `INSERT INTO password_changes (user_id, user_role, change_date) VALUES (?, 'student', datetime('now'))`;
    } else {
        return res.status(400).json({ success: false, message: 'Invalid Role Detected.' });
    }

    // Step 1: Verify Old Password
    activeDb.get(authQuery, [userId], (err, user) => {
        if(err) return res.status(500).json({ success: false, message: 'Database query error.' });
        if(!user) return res.status(404).json({ success: false, message: 'User not found in system.' });
        if(user.password !== oldPassword) return res.status(401).json({ success: false, message: 'Incorrect Current Password.' });
        
        // Step 2: Rate Limit Verification (Max 3 changes per month)
        // Get start of current month (YYYY-MM)
        const currentMonthPrefix = new Date().toISOString().slice(0, 7);
        let rateLimitQuery = '';
        if(role === 'admin') {
            rateLimitQuery = `SELECT COUNT(*) as count FROM admin_password_changes WHERE user_id = ? AND change_date LIKE ?`;
        } else {
            rateLimitQuery = `SELECT COUNT(*) as count FROM password_changes WHERE user_id = ? AND change_date LIKE ?`;
        }

        activeDb.get(rateLimitQuery, [userId, currentMonthPrefix + '%'], (err, row) => {
            if(err) return res.status(500).json({ success: false, message: 'Failed to verify security limits.' });
            
            if(row.count >= 3) {
                return res.status(429).json({ success: false, message: 'SECURITY LOCK: Password change limit reached (max 3 times/month).' });
            }

            // Step 3: Execute Change and Log it
            activeDb.run(updateQuery, [newPassword, userId], function(err) {
                if(err) return res.status(500).json({ success: false, message: 'Failed to update credentials.' });
                
                activeDb.run(logQuery, [userId], function(errLog) {
                    if(errLog) console.warn("Failed to log password change:", errLog.message);
                    res.json({ success: true, message: 'Password updated successfully and securely logged.' });
                });
            });
        });
    });
});

// ==== WebSocket Setup for Live Classroom ====
io.on('connection', (socket) => {
    console.log('🔗 New global classroom connection:', socket.id);

    // Relay student actions to Master Live Class
    socket.on('student-action', (data) => {
        io.emit('teacher-notification', data);
    });

    socket.on('disconnect', () => {
        console.log('❌ Classroom connection dropping:', socket.id);
    });
});

// ==== Fallback Route Control ====
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// ==== Execution ====
server.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`🚀 ALIES SERVER ACTIVE AT: http://localhost:${PORT}`);
    console.log(`===========================================\n`);
});
