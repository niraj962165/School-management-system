const greeting = document.getElementById('greeting');
const hour = new Date().getHours();
let greetWord = 'Good Day';
if(hour < 12) greetWord = 'Good morning';
else if(hour < 18) greetWord = 'Good afternoon';
else greetWord = 'Good evening';
greeting.innerText = `${greetWord}, Administrator! 🛡️`;
console.log("Admin module instantiated successfully.");
