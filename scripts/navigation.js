const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

hamburgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});