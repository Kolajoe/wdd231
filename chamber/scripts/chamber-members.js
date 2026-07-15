async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

function displayMembers(members, view = 'grid') {
    const container = document.getElementById('membersContainer');
    container.className = view === 'grid' ? 'grid-view' : 'list-view';
    container.innerHTML = '';
    
    document.getElementById('memberCount').textContent = 
        `Showing ${members.length} members`;
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        let badgeClass = 'badge-member';
        let badgeText = 'Member';
        if (member.membershipLevel === 3) {
            badgeClass = 'badge-gold';
            badgeText = 'Gold';
        } else if (member.membershipLevel === 2) {
            badgeClass = 'badge-silver';
            badgeText = 'Silver';
        }
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <div class="card-body">
                <h3>${member.name}</h3>
                <span class="membership-badge ${badgeClass}">${badgeText}</span>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <a href="${member.website}" target="_blank" class="website">🌐 Visit Website</a>
                <p class="description">${member.description || ''}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function setupViewToggle() {
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    let currentView = 'grid';
    let members = [];
    
    getMembers().then(data => {
        members = data;
        displayMembers(members, currentView);
    });
    
    gridBtn.addEventListener('click', () => {
        if (currentView !== 'grid') {
            currentView = 'grid';
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            displayMembers(members, currentView);
        }
    });
    
    listBtn.addEventListener('click', () => {
        if (currentView !== 'list') {
            currentView = 'list';
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            displayMembers(members, currentView);
        }
    });
}

document.addEventListener('DOMContentLoaded', setupViewToggle);