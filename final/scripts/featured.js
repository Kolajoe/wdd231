async function loadFeaturedResearch() {
    const container = document.getElementById('featured-container');
    if (!container) {
        console.error('Container #featured-container not found!');
        return;
    }

    try {
        console.log('Loading featured research...');
        const response = await fetch('./data/research.json');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data loaded:', data);
        
        if (!data.projects || data.projects.length === 0) {
            container.innerHTML = '<p>No research projects available.</p>';
            return;
        }

        const featured = data.projects.slice(0, 3);
        
        container.innerHTML = '';
        featured.forEach(project => {
            const card = document.createElement('div');
            card.className = 'featured-card';
            
            const statusColor = project.status === 'completed' ? '#28a745' :
                               project.status === 'ongoing' ? '#ffc107' : '#17a2b8';
            const statusTextColor = project.status === 'completed' ? 'white' : '#333';

            card.innerHTML = `
                <h3>${project.title}</h3>
                <span style="display:inline-block;padding:0.2rem 0.8rem;border-radius:12px;font-size:0.75rem;font-weight:700;text-transform:uppercase;background:${statusColor};color:${statusTextColor};">
                    ${project.status}
                </span>
                <p style="color:#555;font-size:0.85rem;margin:0.5rem 0;text-transform:capitalize;">${project.category}</p>
                <p>${project.description.substring(0, 120)}${project.description.length > 120 ? '...' : ''}</p>
                <button onclick="alert('${project.title}\\n\\n${project.description}')" 
                        style="padding:0.4rem 1.2rem;background:#1a3a5c;color:white;border:none;border-radius:20px;cursor:pointer;font-weight:500;transition:background 0.3s;"
                        onmouseover="this.style.background='#c8963e'"
                        onmouseout="this.style.background='#1a3a5c'">
                    View Details
                </button>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading featured research:', error);
        container.innerHTML = `
            <div style="padding:2rem;text-align:center;background:#f8d7da;border-radius:8px;color:#721c24;">
                <p>⚠️ Unable to load featured research.</p>
                <p style="font-size:0.9rem;">Error: ${error.message}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadFeaturedResearch);