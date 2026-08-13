import { fetchResearchData } from './research-data.js';
let allProjects = [];
function displayProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    container.innerHTML = '';
    if (projects.length === 0) {
        container.innerHTML = '<p class="no-results">No projects found.</p>';
        return;
    }

    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.dataset.id = project.id;

        const statusClass = project.status === 'completed' ? 'status-completed' :
                           project.status === 'ongoing' ? 'status-ongoing' : 'status-planned';

        card.innerHTML = `
            <h3>${project.title}</h3>
            <span class="status-badge ${statusClass}">${project.status}</span>
            <p class="project-category">${project.category}</p>
            <p class="project-description">${project.description.substring(0, 120)}${project.description.length > 120 ? '...' : ''}</p>
            <button class="view-details" data-id="${project.id}">View Details</button>
        `;

        container.appendChild(card);
    });

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const project = allProjects.find(p => p.id === id);
            if (project) {
                openModal(project);
            }
        });
    });
}

function openModal(project) {
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const category = document.getElementById('modal-category');
    const status = document.getElementById('modal-status');
    const contact = document.getElementById('modal-contact');

    if (modal && title && description && category && status && contact) {
        title.textContent = project.title;
        description.textContent = project.description;
        category.textContent = project.category;
        status.textContent = project.status;
        contact.textContent = project.contact;
        modal.showModal();
    }
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            if (filter === 'all') {
                displayProjects(allProjects);
            } else {
                const filtered = allProjects.filter(p => p.category === filter);
                displayProjects(filtered);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('project-modal');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.close());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });
    }
});

async function init() {
    console.log('Fetching research data...');
    const projects = await fetchResearchData();
    console.log('Projects received:', projects.length);
    allProjects = projects;
    displayProjects(projects);
    setupFilters();
}

if (document.getElementById('projects-grid')) {
    document.addEventListener('DOMContentLoaded', init);
}