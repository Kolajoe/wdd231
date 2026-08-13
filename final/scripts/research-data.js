// scripts/research-data.js - Module ES
export async function fetchResearchData() {
    try {
        const response = await fetch('./data/research.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('Error fetching research data:', error);
        return [];
    }
}