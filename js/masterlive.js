// Initialize Socket connection
const socket = io();

const eventList = document.getElementById('eventList');
const eventCount = document.getElementById('eventCount');
let counter = 0;

// Listen for incoming student interactions
socket.on('teacher-notification', (data) => {
    // data: { action: 'Raise Hand', studentId: 'S101', studentName: 'Yash', message: '...', timestamp: ... }
    
    // Remove empty state if it's the first event
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    // Increment badge
    counter++;
    eventCount.textContent = counter;

    // Create Event Card
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';

    // Assign specific border
    if(data.action.includes('Hand')) eventCard.classList.add('action-hand');
    else if(data.action.includes('Doubt')) eventCard.classList.add('action-doubt');
    else if(data.action.includes('Answer')) eventCard.classList.add('action-answer');

    // Time Formatting
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // HTML Structure
    eventCard.innerHTML = `
        <div class="event-top">
            <span class="event-name">👤 ${data.studentName || 'Student (' + data.studentId + ')'}</span>
            <span class="event-time">${timeString}</span>
        </div>
        <span class="event-action">${data.action}</span>
        ${data.message ? `<div class="event-message">"${data.message}"</div>` : ''}
    `;

    // Prepend to top of list
    eventList.prepend(eventCard);
});
