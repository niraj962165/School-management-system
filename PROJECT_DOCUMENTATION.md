# Alies International School - comprehensive LMS Project Documentation

Welcome to the **Alies International School Learning Management System** (LMS). This robust project acts as a complete, two-way bridge between Faculty and Students, turning a standard school website into an interactive digital classroom. 

This document serves as the "Single Source of Truth," outlining the system architecture, stack requirements, core features, and the user manual.

---

## 1. Technology Stack & Languages Used

The project was built without relying on bloated, heavy frameworks (like React or Django). Instead, it implements a highly optimized, raw technology stack to execute blisteringly fast operations directly on the server level using Node.js.

### Frontend (Client-Side)
- **HTML5**: Structured semantic web architecture across the numerous Portal interfaces.
- **CSS3 (Vanilla)**: Features highly modern aesthetic choices such as Glassmorphism, dynamic flex grids, responsive Split-Cards, and custom animations, all built natively without libraries like Bootstrap or Tailwind.
- **JavaScript (ES6+)**: Handles complex DOM manipulation, `localStorage`/`sessionStorage` identity authentication natively, and asynchronous `fetch()` protocol API queries.

### Backend (Server-Side)
- **Node.js**: The runtime environment executing the core JavaScript engine logic locally.
- **Express.js**: A lightweight, fast Node.js web framework acting as our REST API router and static file architecture server.
- **Socket.io**: Establishes raw real-time, bi-directional event-based communication pipelines (used specifically for the Live Classroom "Raise Hand" notifications).
- **Multer**: A middleware handling `multipart/form-data` for securely accepting User PDF/Image payloads, safely mapping them into physical hard-drive folders while correctly preserving `.extensions`.

### Database Architecture
- **SQLite3**: A C-language library implementing a lightweight, disk-based, self-contained SQL database engine requiring no separate server process.
- **SQL File Bootloaders**: The database is structured dynamically using SQL blueprints (`database.sql`, `attendance.sql`, `notes.sql`, `assignments.sql`, and `marks.sql`) that execute sequentially upon Server boot to verify system tables dynamically.

---

## 2. System Configuration Requirements

To successfully boot and operate the Alies LMS Server locally, the Host machine must meet these minimum software specifications:

- **Operating System**: Windows 10/11, macOS, or Linux.
- **Node.js Engine**: Version `v16.14.0` or higher (Includes `npm`).
- **Storage Profile**: Minimum 200MB free disk space for Node Modules and user `uploads/` limits.
- **Network Interface**: Development operations bind to `localhost:5000` (TCP access required).
- **Web Browser**: A modern tier-1 Web Browser (Google Chrome, Edge, Safari, Firefox).

---

## 3. Comprehensive Feature Matrix

### 🟢 3.1 Secure Authentication System
Identity states are securely validated via SQL injection-resistant querying algorithms.
- **Faculty Logic**: Evaluates `login_id` and password from the `teachers` master sheet. Passes identity to the Dashboard.
- **Student Profile**: Validates `student_id` bridging exact Name, Associated Classroom, Roll Number, and Section directly to the dashboard viewport.

### 🟢 3.2 Live Classroom WebSocket Broadcaster
- Maps a raw real-time digital classroom (`masterlive.html` vs `live.html`).
- Students can dispatch live "Interaction" alerts straight to the Master View without refreshing the browser UI.

### 🟢 3.3 Target-Based Attendance Code Generator
- Faculty select a Target Class and Section, triggering a mathematically secured random **4-Digit Code**.
- The server continuously `polls` the active connections in a 3-second loop.
- When students type the code, the SQLite ledger successfully flips them from `Absent` to `Present`, instantly echoing the update back onto the Teacher's screen live.

### 🟢 3.4 Dual-Way Assignment & Gradebook Modules
A full-stack implementation connecting uploads flawlessly.
1. **Teacher Task Publishing**: Faculty launch tasks containing detailed instructions, precise Due Dates, and optional Reference PDFs.
2. **Student Submissions Hub**: Students retrieve data specifically queried to their exact Class. They can read tasks and upload their own Completion files mapped explicitly against the Homework ID.
3. **Faculty "Checking" Engine**: Retrieves a cleanly built grid of every student submission, extracting the Student Name, Roll No, Submitted file, and optional text notes directly to the frontend.

### 🟢 3.5 Course Notes Distribution System
Allows Faculty to select isolated academic scopes ("Class 12 - Advanced Physics") and push global PDFs so specifically mapped students can natively download their resources. 

### 🟢 3.6 Physical Filesystem Deletion Engine (Storage Preservation)
If incorrect files are posted, neither students nor professors need to be permanently trapped with the error.
- UI explicitly enables raw server wiping utilizing `fs.unlinkSync()`.
- Destroying a teacher task cascades its wipe directly into Student physical submissions, preserving massive amounts of hard-drive allocation securely.

---

## 4. Operational User Manual

### Initializing the Server Network
1. Open a system Terminal within the central directory folder.
2. Initialize dependencies once (if not already installed): `npm install express cors sqlite3 socket.io multer`.
3. Launch the central Application Node: `node server.js`
4. Visit `http://localhost:5000` in your Web Browser.

### Flow Step 1: Faculty Login
- Launch the Faculty specific login interface.
- Sample Identity Credentials: **T101 / T101**.
- Once inside the UI, explore `Assignment Server` or `Generate Attendance`.

### Flow Step 2: Student Syncing
- Open an Incognito Window or physically separate Browser. Launch Student Login interface.
- Sample Identity Credentials: **S601 / S601**.
- Traverse to the `Assignments Center` to review the newly posted teacher coursework, or manually join the `Live Classroom`.

---

**Built exclusively for Alies International Core Platform. All Databases secured and operating offline natively!**
