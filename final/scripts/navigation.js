// Hamburger Menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        hamburgerBtn.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
}