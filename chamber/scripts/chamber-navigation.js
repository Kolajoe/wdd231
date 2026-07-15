// Hamburger Menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

hamburgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburgerBtn.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
});

// Fermer le menu au clic sur un lien (mobile)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            mainNav.classList.remove('open');
            hamburgerBtn.textContent = '☰';
        }
    });
});