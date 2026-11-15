document.addEventListener('DOMContentLoaded', async () => {
    // 1. Verify Faculty Origin Identity
    const facultyStr = localStorage.getItem('currentTeacher') || sessionStorage.getItem('loggedInUser');
    if (!facultyStr) {
        alert("Authentication logic absent.");
        window.location.href = '../auth/login_teacher.html';
        return;
    }

    const gridEl = document.getElementById('submissionsGridContainer');

    // 2. Stream Data Objects mapped precisely
    try {
        const resp = await fetch('/api/assignments/faculty/submissions');
        const data = await resp.json();

        if(data.success) {
            if(data.submissions.length === 0) {
                gridEl.innerHTML = `<p style="grid-column:1/-1; padding:4rem; text-align:center; color:#64748b; border:2px dashed #cbd5e1; border-radius:12px; font-size:1.1rem; background:white;">No student submissions have landed into the centralized SQLite server yet. <br><br> Wait until homework files are deposited.</p>`;
                return;
            }

            gridEl.innerHTML = ''; // reset stream spinner loader

            data.submissions.forEach(sub => {
                const submitDate = new Date(sub.submitted_at);
                const strDate = `${submitDate.toLocaleDateString()} at ${submitDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

                gridEl.innerHTML += `
                    <div class="sub-card">
                        <div class="sub-header">
                            <div>
                                <div class="sub-name">${sub.student_name}</div>
                                <div style="font-size:0.85rem; color:#64748b; font-weight:700; margin-top:2px;">Roll No: ${sub.roll_no} | Target Class ${sub.target_class}</div>
                            </div>
                            <span class="graded-badge">RECEIVED PENDING</span>
                        </div>
                        <div class="sub-meta">
                            <span style="border-bottom: 1px dotted #cbd5e1; padding-bottom:5px;"><strong>Task Map:</strong> <span style="color:#4f46e5; font-weight:bold;">${sub.title}</span></span>
                            <span style="border-bottom: 1px dotted #cbd5e1; padding-bottom:5px;"><strong>Upload Snapshot:</strong> ${strDate}</span>
                            <div style="margin-top:10px; padding:12px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0; max-height:80px; overflow-y:auto;">
                                <strong>Attached Note Context:</strong><br>
                                ${sub.notes || '<em style="color:#94a3b8;">No additional feedback or query was attached.</em>'}
                            </div>
                        </div>
                        <a href="${sub.file_path}" download="${sub.student_name.replace(' ', '_')}_Assignment" target="_blank" class="review-btn">
                            Download Source Artifact
                        </a>
                    </div>
                `;
            });
        } else {
            gridEl.innerHTML = `<p style="color:red; font-weight:bold; grid-column:1/-1;">LMS backend blocked the database connection sequence.</p>`;
        }
    } catch(err) {
        console.error(err);
        gridEl.innerHTML = `<p style="color:red; font-weight:bold; grid-column:1/-1; padding:2rem;">Network error securing server streams.</p>`;
    }
});
