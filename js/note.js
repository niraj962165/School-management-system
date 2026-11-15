document.addEventListener('DOMContentLoaded', async () => {
    // 1. Verify Student Authentication Natively
    const studentStr = localStorage.getItem('currentStudent');
    if (!studentStr) {
        alert("Authentication context absent. Please login as a student.");
        window.location.href = '../auth/login.html';
        return;
    }

    const student = JSON.parse(studentStr);
    
    // Inject Label
    const classLabel = document.getElementById('studentClassLabel');
    if(classLabel) classLabel.textContent = student.class;

    // 2. Fetch Notes exclusively for this user's class
    const notesGridContainer = document.getElementById('notesGridContainer');
    
    try {
        const response = await fetch('/api/notes/' + student.class);
        const data = await response.json();
        
        if (data.success) {
            if (data.notes.length === 0) {
                notesGridContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; background: white; padding: 4rem; border-radius: 16px; border: 2px dashed #cbd5e1; text-align: center; color: #64748b; margin-top:2rem;">
                        <span style="font-size:3rem; display:block; margin-bottom:1rem;">📭</span>
                        <h3 style="color:#0f172a; margin-bottom:10px; font-size:1.5rem;">No class materials discovered!</h3>
                        <p>Faculty portal has not securely pushed any curriculum notes to the database for Class ${student.class} yet. They will automatically appear here once published.</p>
                    </div>`;
                return;
            }
            
            // Build the specific Grid layout
            notesGridContainer.innerHTML = ''; // clear loading state
            
            data.notes.forEach(note => {
                const dateObj = new Date(note.upload_date);
                const readableDate = `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

                notesGridContainer.innerHTML += `
                    <div class="note-card">
                        <div class="note-icon">📁</div>
                        <div class="note-title">${note.subject_domain}</div>
                        <div class="note-meta">
                            <span><strong>Instructor:</strong> Prof. ${note.teacher_name}</span>
                            <span><strong>Date:</strong> ${readableDate}</span>
                            <span><strong>Original File:</strong> ${note.original_name}</span>
                        </div>
                        <a href="${note.file_path}" download="${note.original_name}" target="_blank" class="download-btn">Secure Download</a>
                    </div>
                `;
            });
            
        } else {
            notesGridContainer.innerHTML = '<p style="color:#ef4444; font-weight:bold; grid-column: 1 / -1;">Failed to retrieve notes catalog from server backend routing.</p>';
        }
    } catch (err) {
        console.error("Notes Network Error", err);
        notesGridContainer.innerHTML = '<p style="color:#ef4444; font-weight:bold; grid-column: 1 / -1; padding:2rem;">Network or Port failure. Is the underlying NodeJS server.js fully active on 5000?</p>';
    }
});
