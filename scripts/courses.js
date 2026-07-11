const courses = [
    { code: 'CSE 110', name: 'Introduction to programming', credits: 3, completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 2, completed: true },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 2, completed: true },
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { code: 'WDD 231', name: 'Web Frontend Development I', credits: 2, completed: false },
];

function displayCourses(filter = 'all') {
    const container = document.getElementById('courseContainer');
    container.innerHTML = '';

    let filteredCourses = courses;
    if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
    }

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        if (course.completed) {
            card.classList.add('completed');
        }
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
        `;
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = totalCredits;
}

document.querySelectorAll('#filterButtons button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        displayCourses(filter);
    });
});

displayCourses('all');