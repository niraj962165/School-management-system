document.addEventListener('DOMContentLoaded', async () => {
    // 1. Authenticate Identity Natively
    const studentStr = localStorage.getItem('currentStudent') || sessionStorage.getItem('loggedInUser');
    if (!studentStr) {
        alert("Authentication context absent. Please login as student.");
        window.location.href = '../auth/login.html';
        return;
    }

    const studentUser = JSON.parse(studentStr);
    const classLabel = document.getElementById('studentClassLabel');
    if(classLabel) classLabel.textContent = studentUser.class;

    const feedEl = document.getElementById('tasksFeed');
    const selectEl = document.getElementById('subTaskId');

    // 2. Fetch Assigned Materials Filtered by Class Parameter Natively
    try {
        const response = await fetch('/api/assignments/class/' + studentUser.class);
        const data = await response.json();
        
        feedEl.innerHTML = '';
        selectEl.innerHTML = '<option value="">Select the task you are depositing into...</option>';

        if(data.success && data.tasks.length > 0) {
            data.tasks.forEach(task => {
                const dateParam = new Date(task.created_at);
                const strDate = `${dateParam.toLocaleDateString()} at ${dateParam.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                
                // Construct the secure file download override UI
                let fileHTML = '';
                if(task.file_path) {
                    fileHTML = `<a href="${task.file_path}" download="${task.original_name}" style="display:inline-block; margin-top:12px; padding:10px 15px; border-radius:8px; border:1px solid #cbd5e1; background:white; color:#4f46e5; font-weight:700; text-decoration:none; box-shadow:0 2px 4px rgba(0,0,0,0.05); transition: border-color 0.2s;">Download Source Material</a>`;
                }

                feedEl.innerHTML += `
                    <div class="task-item">
                        <div class="task-header">
                            <span class="task-type" style="background:${task.type === 'Update' ? '#ef4444' : task.type === 'Homework' ? '#f59e0b' : '#3b82f6'}">${task.type}</span>
                            <span style="font-size:0.85rem; color:#64748b; font-weight:700;">Target Due: ${task.due_date}</span>
                        </div>
                        <div class="task-title">${task.title}</div>
                        <div style="font-size:0.85rem; color:#94a3b8; margin-bottom:12px; font-weight:600;">Posted recursively by Prof. ${task.teacher_name} - ${strDate}</div>
                        <div class="task-desc">${task.description || 'No extended text body was attached.'}</div>
                        ${fileHTML}
                    </div>
                `;

                // Submissions Dropdown filter natively avoiding "Updates" requiring files
                if(task.type !== 'Update') {
                    selectEl.innerHTML += `<option value="${task.id}">${task.title} (Due: ${task.due_date})</option>`;
                }
            });
            
            if(selectEl.options.length === 1) {
                 selectEl.innerHTML = '<option value="">No Active Uploads Demanded...</option>';
                 selectEl.disabled = true;
            }
        } else {
            feedEl.innerHTML = `<p style="padding:40px 20px; font-size:1.1rem; border:2px dashed #cbd5e1; border-radius:12px; text-align:center; color:#64748b;">No active tasks or updates for Class ${studentUser.class} right now.</p>`;
            selectEl.innerHTML = '<option value="">Network idle. Zero tasks located.</option>';
            selectEl.disabled = true;
            document.getElementById('subFile').disabled = true;
            document.getElementById('subBtn').style.opacity = '0.5';
        }
    } catch(err) {
        feedEl.innerHTML = `<p style="color:red; font-weight:bold;">Network error pinging SQL framework.</p>`;
    }

    // 3. Document Submission Router Process
    document.getElementById('submissionForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('subBtn');
        const statusEl = document.getElementById('subStatus');
        btn.disabled = true;
        btn.innerText = "Encrypting file and pushing...";

        const formData = new FormData();
        formData.append('taskId', selectEl.value);
        formData.append('studentId', studentUser.id);
        formData.append('notes', document.getElementById('subNotes').value);
        formData.append('submissionDocument', document.getElementById('subFile').files[0]);

        try {
            const resp = await fetch('/api/assignments/submit', { method: 'POST', body: formData });
            const sData = await resp.json();
            
            if(sData.success) {
                statusEl.style.color = "#10b981";
                statusEl.innerText = "✅ Tracked assignment pushed into grading database!";
                document.getElementById('submissionForm').reset();
                setTimeout(()=>{statusEl.innerText="";}, 5000);
                loadVaultSubmissions(); // Auto refresh
            } else {
                statusEl.style.color = "#ef4444";
                statusEl.innerText = "❌ Verification refused: " + sData.message;
            }
        } catch(e) {
            statusEl.style.color = "#ef4444";
            statusEl.innerText = "❌ Network connection dropped.";
        } finally {
            btn.disabled = false;
            btn.innerText = "Deposit Document Securely";
        }
    });

    // 4. Secure Vault Loader mapped to Student Deletion System
    const loadVaultSubmissions = async () => {
        const feed = document.getElementById('studentSubsFeed');
        if(!feed) return;

        try {
            const resp = await fetch('/api/assignments/student/submissions/' + studentUser.id);
            const data = await resp.json();
            
            if(data.success && data.submissions.length > 0) {
                feed.innerHTML = '';
                data.submissions.forEach(sub => {
                    const submitDate = new Date(sub.submitted_at);
                    const strDate = `${submitDate.toLocaleDateString()} ${submitDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                    
                    feed.innerHTML += `
                        <div class="task-item" style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <span class="task-type" style="background:#10b981;">DEPOSITED</span>
                                <h4 style="margin:8px 0;">${sub.task_title}</h4>
                                <small style="color:#64748b;">Uploaded On: ${strDate}</small>
                            </div>
                            <div style="display:flex; gap:10px;">
                                <a href="${sub.file_path}" download="${sub.original_name}" style="background:#f1f5f9; color:#4f46e5; border:1px solid #cbd5e1; padding:10px 15px; border-radius:8px; font-weight:bold; text-decoration:none; transition: 0.2s;">
                                    View File
                                </a>
                                <button onclick="window.withdrawSubmission(${sub.id})" style="background:#ef4444; color:white; border:none; padding:10px 15px; border-radius:8px; cursor:pointer; font-weight:bold; transition: 0.2s;">
                                    🗑️ Withdraw
                                </button>
                            </div>
                        </div>
                    `;
                });
            } else {
                feed.innerHTML = '<p style="padding:10px; color:#64748b;">No documents are currently held in your secure vault.</p>';
            }
        } catch(e) {
            feed.innerHTML = '<p style="color:red; font-weight:bold;">Database node disconnected.</p>';
        }
    };

    // Attach global window hook for explicit file destruction inline
    window.withdrawSubmission = async (subId) => {
        if(!confirm("Are you absolutely sure you logically want to withdraw this document?\n\nWARNING: The physical file will be completely wiped off the server's hard drive and your teacher will no longer see it!")) return;
        
        try {
            const resp = await fetch('/api/assignments/submission/' + subId, { method: 'DELETE' });
            const data = await resp.json();
            
            if(data.success) {
                alert("🧹 System Purged: " + data.message);
                loadVaultSubmissions();
            } else {
                alert("❌ Verification Error: Server refused withdrawal.");
            }
        } catch(e) {
            alert("❌ Network Error: Could not reach deletion protocol node.");
        }
    };

    // Trigger explicit render
    loadVaultSubmissions();
});
