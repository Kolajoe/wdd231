async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('spotlights-container').innerHTML = `
            <p class="error-message">⚠️ Unable to load member spotlights. Please try again later.</p>
        `;
        return [];
    }
}

function selectSpotlights(members, count = 3) {
    const goldMembers = members.filter(m => m.membershipLevel === 3);
    const silverMembers = members.filter(m => m.membershipLevel === 2);
    
    const shuffledGold = goldMembers.sort(() => Math.random() - 0.5);
    const shuffledSilver = silverMembers.sort(() => Math.random() - 0.5);
    
    const selected = [];
    
    for (let i = 0; i < Math.min(2, shuffledGold.length); i++) {
        selected.push(shuffledGold[i]);
    }
    
    if (shuffledSilver.length > 0) {
        selected.push(shuffledSilver[0]);
    }
    
    while (selected.length < count && selected.length < members.length) {
        const remaining = members.filter(m => !selected.includes(m));
        if (remaining.length === 0) break;
        selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
    }
    
    return selected;
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlights-container');
    container.innerHTML = '';
    
    if (members.length === 0) {
        container.innerHTML = '<p>No spotlights available.</p>';
        return;
    }
    
    members.forEach(member => {
        let badgeClass = 'badge-member';
        let badgeText = 'Member';
        if (member.membershipLevel === 3) {
            badgeClass = 'badge-gold';
            badgeText = 'Gold';
        } else if (member.membershipLevel === 2) {
            badgeClass = 'badge-silver';
            badgeText = 'Silver';
        }
        
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <div class="spotlight-body">
                <h3>${member.name}</h3>
                <span class="membership-badge ${badgeClass}">${badgeText}</span>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <a href="${member.website}" target="_blank" class="website">🌐 Visit Website</a>
                ${member.description ? `<p class="description">${member.description}</p>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

async function loadSpotlights() {
    const members = await getMembers();
    if (members.length > 0) {
        const selected = selectSpotlights(members, 3);
        displaySpotlights(selected);
    }
}

document.addEventListener('DOMContentLoaded', loadSpotlights);