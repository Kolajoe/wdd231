// scripts/thankyou.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    const fields = {
        'name': 'display-name',
        'email': 'display-email',
        'subject': 'display-subject',
        'message': 'display-message',
        'timestamp': 'display-timestamp'
    };

    for (const [param, id] of Object.entries(fields)) {
        const value = urlParams.get(param);
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value ? decodeURIComponent(value) : 'Not provided';
        }
    }
});