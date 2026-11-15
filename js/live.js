// Connect to master websocket
const socket = io();

const btnRaiseHand = document.getElementById('btnRaiseHand');
const btnAskDoubt = document.getElementById('btnAskDoubt');
const btnSubmitAnswer = document.getElementById('btnSubmitAnswer');

const modal = document.getElementById('interactionModal');
const modalTitle = document.getElementById('modalTitle');
const modalInput = document.getElementById('modalInput');
const cancelModal = document.getElementById('cancelModal');
const sendModal = document.getElementById('sendModal');

let currentAction = '';

// Extract Current User
// Extract Current User prioritizing Student Portal data
const studentStr = localStorage.getItem('currentStudent');
const teacherStr = sessionStorage.getItem('loggedInUser');
const user = studentStr ? JSON.parse(studentStr) : (teacherStr ? JSON.parse(teacherStr) : { id: 'Unknown', name: 'Anonymous Student' });

// Raise Hand Logic
btnRaiseHand.addEventListener('click', () => {
    btnRaiseHand.classList.toggle('primary-btn');
    const isRaised = btnRaiseHand.classList.contains('primary-btn');

    if(isRaised) {
        btnRaiseHand.innerHTML = '<span class="icon">🤚</span> Hand Raised';
        socket.emit('student-action', {
            action: 'Hand Raised',
            studentId: user.id || user.rollNo,
            studentName: user.name,
            timestamp: Date.now()
        });
    } else {
        btnRaiseHand.innerHTML = '<span class="icon">✋</span> Raise Hand';
        // Note: Generally we don't alert "Hand lowered", but you could.
    }
});

// Generic Modal Flow setup
function openModal(title, placeholder) {
    currentAction = title;
    modalTitle.textContent = title;
    modalInput.placeholder = placeholder;
    modalInput.value = '';
    modal.style.display = 'flex';
    modalInput.focus();
}

btnAskDoubt.addEventListener('click', () => {
    openModal('Ask a Doubt', 'Type your overarching question clearly...');
});

btnSubmitAnswer.addEventListener('click', () => {
    openModal('Submit Answer', 'Type your formal answer to the current question...');
});

cancelModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Submit generic workflow
sendModal.addEventListener('click', () => {
    if(modalInput.value.trim() === '') {
        alert("Please type something before sending.");
        return;
    }
    
    // Broadcast to teacher console via Socket.io
    socket.emit('student-action', {
        action: currentAction,
        message: modalInput.value.trim(),
        studentId: user.id || user.rollNo,
        studentName: user.name,
        timestamp: Date.now()
    });

    alert(currentAction + " submitted successfully. The teacher has been notified.");
    modal.style.display = 'none';
});

// Exit modal implicitly
window.addEventListener('click', (e) => {
    if(e.target === modal) modal.style.display = 'none';
});
