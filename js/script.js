const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('overlay');
const panel = document.getElementById('panel');

function toggleMenu() {
    // Toggle active classes
    menuBtn.classList.toggle('active');
    overlay.classList.toggle('active');
    panel.classList.toggle('active');
}

// Add Event Listeners
menuBtn.addEventListener('click', toggleMenu);

// Clicking overlay will close the menu
overlay.addEventListener('click', () => {
    if (panel.classList.contains('active')) {
        toggleMenu();
    }
});

// Scroll Event for Brand Title Header
const brandHeading = document.querySelector('.brand-title');

function handleScroll() {
    if (window.scrollY > 80 || document.documentElement.scrollTop > 80) {
        brandHeading.classList.add('scrolled');
    } else {
        brandHeading.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('scroll', handleScroll, { passive: true });
