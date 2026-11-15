# Goal Description
We need to generate the foundations for three distinct dashboards (Student, Faculty, and Admin) along with their respective CSS and JS files, plus a dedicated "Live Class" page.

## Proposed Changes

### 1. Student Portal (`student_portal.html`, `stylestudent.css`, `stylestudent.js`)
- **Dashboard Layout:** A clean, modern UI greeting the student ("Hello, [Name]"). Below it, displaying student details like Roll No, Class, and Section.
- **Interactions (JS):** 
  - **Attendance:** A button that triggers a JS `prompt()` asking for the teacher's code.
  - **Notes:** A button that opens a view or modal showing course notes.
  - **Submit Assignment:** An interface to upload images, displaying a "Deposit By" and "Collection" date.
  - **Live Class:** A button routing the user to `live.html`.
  
### 2. Live Class Page (`live.html`, `live.css`, `live.js`)
- **Main View:** A large "whiteboard" placeholder space spanning the upper screen.
- **Controls:** A bottom action bar containing 3 interactive buttons: "Ask Doubt", "Raise Hand", and "Submit Answer". These will have basic JS listeners attached for future functionality.

### 3. Faculty & Admin Portals 
- **Faculty:** `faculty_portal.html`, `stylefaculty.css`, `stylefaculty.js` (and potentially `teacher_portal.html` aliased/redirected if needed based on the slight naming mix-up).
- **Admin:** `admin_portal.html`, `styleAdmin.css`, `styleAdmin.js`
- **Initial State:** Standard dashboard skeletons waiting for further directives (as you mentioned you will "tell the next thing" after this step).

## Verification Plan
1. Open `student_portal.html` to verify the greeting, details, and the 4 functional buttons.
2. Click "Live Class" to navigate to `live.html` and verify the whiteboard UI and control buttons work seamlessly.
