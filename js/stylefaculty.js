document.addEventListener('DOMContentLoaded', () => {
    // Validate strict login locally
    const loggedInUserStr = sessionStorage.getItem('loggedInUser');
    const userRole = sessionStorage.getItem('userRole');

    if (!loggedInUserStr || userRole !== 'teacher') {
        alert("Authentication Error: Faculty credentials required.");
        window.location.href = '../auth/login.html';
        return;
    }

    const user = JSON.parse(loggedInUserStr);
    
    // Header Greeting
    if (document.getElementById('facultyName')) document.getElementById('facultyName').textContent = user.name || "Faculty";
    
    // Details Grid Settings Matches UI exactly
    if (document.getElementById('facName')) document.getElementById('facName').textContent = user.name || "N/A";
    if (document.getElementById('facId')) document.getElementById('facId').textContent = user.id || user.user_id;
    if (document.getElementById('facCourse')) document.getElementById('facCourse').textContent = user.course || "General Domain";
    if (document.getElementById('facEmail')) document.getElementById('facEmail').textContent = user.email || "Confidential";

    // 2. Notes Uploader
    const notesForm = document.getElementById('notesForm');
    if (notesForm) {
        notesForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = notesForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            try {
                btn.textContent = 'Uploading...';
                btn.disabled = true;

                const formData = new FormData();
                formData.append('teacherId', user.id || user.user_id);
                formData.append('targetClass', document.getElementById('noteTargetClass').value);
                formData.append('teacherDomain', document.getElementById('noteDomain').value);
                formData.append('noteDocument', document.getElementById('noteFile').files[0]);

                const response = await fetch('/api/notes/upload', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if(data.success) {
                    alert(data.message);
                    notesForm.reset();
                } else {
                    alert('Upload failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error uploading notes:', error);
                alert("Network failure.");
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // 4. Marks Uploader
    const marksForm = document.getElementById('marksForm');
    if (marksForm) {
        marksForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = marksForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            try {
                btn.textContent = 'Syncing...';
                btn.disabled = true;

                const payload = {
                    studentId: document.getElementById('markStudentId').value,
                    teacherId: user.id || user.user_id,
                    subject: document.getElementById('markSubject').value,
                    examName: document.getElementById('markExam').value,
                    date: new Date().toISOString().split('T')[0],
                    marks: document.getElementById('markScore').value
                };

                const response = await fetch('/api/marks/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                if(data.success) {
                    alert(data.message);
                    marksForm.reset();
                } else {
                    alert('Marks Sync Failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error uploading marks:', error);
                alert("Network failure.");
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }
});

window.attendancePollInterval = null;

// 1. Generate Attendance Code (Global Function)
async function generateAttendance() {
    const classInput = document.getElementById('attTargetClass').value;
    const sectionInput = document.getElementById('attTargetSection').value;
    const listEl = document.getElementById('attStudentList');
    
    if(!classInput || !sectionInput) {
        alert("Please select both Class and Section.");
        return;
    }

    const userStr = sessionStorage.getItem('loggedInUser');
    const user = userStr ? JSON.parse(userStr) : { id: 'UNKNOWN' };

    try {
        const response = await fetch('/api/attendance/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                teacherId: user.id || user.user_id, 
                targetClass: classInput,
                targetSection: sectionInput
            })
        });
        
        const data = await response.json();
        if(data.success) {
            const display = document.getElementById('attCodeDisplay');
            display.textContent = data.pin;
            display.classList.remove('hidden');
            display.style.display = 'block';
            
            if(listEl) listEl.innerHTML = '<li style="color:#64748b; margin-top:10px;">Waiting for students to join...</li>';
            
            // Clear any old interval
            if(window.attendancePollInterval) clearInterval(window.attendancePollInterval);
            
            // Start polling every 3 seconds for UI tracking
            window.attendancePollInterval = setInterval(async () => {
                try {
                    const statRes = await fetch('/api/attendance/session/' + data.sessionId + '/present');
                    const statData = await statRes.json();
                    
                    if(statData.success && statData.students.length > 0) {
                        listEl.innerHTML = '<li style="color:#64748b; margin-bottom:10px;">Students Marked Present:</li>';
                        statData.students.forEach(s => {
                            listEl.innerHTML += `<li style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">✅ ${s.name} (${s.id})</li>`;
                        });
                    }
                } catch(e) { /* ignore polling errors quietly */ }
            }, 3000);
            
        } else {
            alert("Failed to generate code: " + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Network failure communicating with server.");
    }
}

// 3. Check Assignments (Global Function Hook)
function checkAssignments() {
    alert("Checking assignments logic fetching from DB... (This will open a secure view of student uploads later)");
}

// Logout Hook
function logout() {
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('userRole');
    window.location.href = '../auth/login.html';
}
