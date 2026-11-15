document.addEventListener('DOMContentLoaded', () => {
    // 1. Verify Authentication Native Identity Matrix
    const facultyStr = localStorage.getItem('currentTeacher') || sessionStorage.getItem('loggedInUser');
    if (!facultyStr) {
        alert("Authentication context absent. Please login as faculty.");
        window.location.href = '../auth/login_teacher.html';
        return;
    }

    const facultyUser = JSON.parse(facultyStr);

    // 2. Deploy Multipart Document Publishing Hooks
    document.getElementById('publishForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('publishBtn');
        const statusEl = document.getElementById('publishStatus');
        btn.disabled = true;
        btn.innerText = "Broadcasting securely...";
        
        const formData = new FormData();
        formData.append('teacherId', facultyUser.id || facultyUser.user_id);
        formData.append('targetClass', document.getElementById('taskClass').value);
        formData.append('type', document.getElementById('taskType').value);
        formData.append('title', document.getElementById('taskTitle').value);
        formData.append('description', document.getElementById('taskDesc').value);
        formData.append('dueDate', document.getElementById('taskDueDate').value);
        
        const fileInput = document.getElementById('taskFile');
        if(fileInput.files.length > 0) {
            formData.append('taskDocument', fileInput.files[0]);
        }

        try {
            const response = await fetch('/api/assignments/publish', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if(data.success) {
                statusEl.style.color = "#10b981";
                statusEl.innerText = "✅ Tracked task accurately and fired into the centralized LMS hub!";
                document.getElementById('publishForm').reset();
                setTimeout(() => { statusEl.innerText = ""; }, 5000);
                loadTasks(); // Automatically refresh physical list
            } else {
                statusEl.style.color = "#ef4444";
                statusEl.innerText = "❌ Database pipeline fault: " + data.message;
            }
        } catch (err) {
            statusEl.style.color = "#ef4444";
            statusEl.innerText = "❌ Network connection broken or server inactive.";
            console.error(err);
        } finally {
            btn.disabled = false;
            btn.innerText = "Broadcast Task to Students";
        }
    });

    // 3. Mount Secure Retrieval and Physical File Deletion Architecture
    const loadTasks = async () => {
        const feed = document.getElementById('facultyTasksFeed');
        if(!feed) return;

        try {
            const resp = await fetch('/api/assignments/teacher/tasks/' + (facultyUser.id || facultyUser.user_id));
            const data = await resp.json();
            
            if(data.success && data.tasks.length > 0) {
                feed.innerHTML = '';
                data.tasks.forEach(task => {
                    feed.innerHTML += `
                        <div class="task-item" style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <span class="task-type">${task.type}</span>
                                <h4 style="margin:5px 0;">${task.title}</h4>
                                <small style="color:#64748b;">Target: Class ${task.target_class} | Due: ${task.due_date}</small>
                            </div>
                            <button onclick="window.deleteTask(${task.id})" style="background:#ef4444; color:white; border:none; padding:10px 15px; border-radius:8px; cursor:pointer; font-weight:bold; transition: 0.2s;">
                                🗑️ Shred Artifact
                            </button>
                        </div>
                    `;
                });
            } else {
                feed.innerHTML = '<p style="padding:10px; color:#64748b;">No active tasks embedded in the master database.</p>';
            }
        } catch(e) {
            feed.innerHTML = '<p style="color:red; font-weight:bold;">Database node disconnected.</p>';
        }
    };

    // Attach global function mapping to the inline click handler
    window.deleteTask = async (taskId) => {
        if(!confirm("Are you absolutely sure you want to shred this task completely? \n\nWARNING: This will permanently trigger an fs.unlink override, wiping every student file attached to it off the node server!")) return;
        
        try {
            const resp = await fetch('/api/assignments/task/' + taskId, { method: 'DELETE' });
            const data = await resp.json();
            
            if(data.success) {
                alert("🧹 Server Purged: " + data.message);
                loadTasks();
            } else {
                alert("❌ Verification Error: Server refused deletion protocol.");
            }
        } catch(e) {
            alert("❌ Network Error: Could not reach deletion protocol node.");
        }
    };

    // Fire immediately upon entering interface
    loadTasks();
});
