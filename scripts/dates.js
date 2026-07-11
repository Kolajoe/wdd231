const yearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModifiedP = document.getElementById('lastModified');
lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;