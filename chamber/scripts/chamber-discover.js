import places from '../data/places.mjs';

function displayPlaces(places) {
    const grid = document.getElementById('discover-grid');
    grid.innerHTML = '';

    places.forEach(place => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.style.gridArea = `card${place.id}`;

        // ✅ Correction : Template literal avec backticks
        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="images/${place.image}" alt="${place.name}" loading="lazy">
            </figure>
            <address>📍 ${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more-btn" data-id="${place.id}">Learn More</button>
        `;

        grid.appendChild(card);
    });

    // ✅ Correction : 'btn' → 'button' (nom de la variable)
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const place = places.find(p => p.id === id);
            if (place) {
                alert(`Learn more about ${place.name}!\n\n${place.description}`);
            }
        });
    });
}

function displayVisitMessage() {
    const messageContainer = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastVisit) {
        // ✅ Correction : Template literal avec backticks
        messageContainer.innerHTML = `
            <p class="welcome">👋 Welcome! Let us know if you have any questions.</p>
        `;
    } else {
        const daysSince = Math.floor((now - parseInt(lastVisit)) / oneDay);

        if (daysSince < 1) {
            messageContainer.innerHTML = `
                <p class="soon">🚀 Back so soon! Awesome!</p>
            `;
        } else {
            const dayText = daysSince === 1 ? 'day' : 'days';
            messageContainer.innerHTML = `
                <p class="days">📅 You last visited ${daysSince} ${dayText} ago.</p>
            `;
        }
    }

    localStorage.setItem('lastVisit', now.toString());
}

document.addEventListener('DOMContentLoaded', function() {
    displayVisitMessage();
    displayPlaces(places);
});