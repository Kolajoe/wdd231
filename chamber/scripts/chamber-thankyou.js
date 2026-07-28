document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    const fields = {
        'fname': 'display-fname',
        'lname': 'display-lname',
        'email': 'display-email',
        'phone': 'display-phone',
        'organization': 'display-organization',
        'membership': 'display-membership',
        'timestamp': 'display-timestamp',
    };

    for (const [param, elementId] of Object.entries(fields)) {
        const value = urlParams.get(param);
        if (value) {
            document.getElementById(elementId).textContent = value;
        }
    }

    const membershipDisplay = document.getElementById('display-membership');
    if (membershipDisplay) {
        const level = urlParams.get('membership');
        const levelNames = {
            'np': 'NP Membership (Non-Profit)',
            'bronze': 'Bronze Membership',
            'silver': 'Silver Membership',
            'gold': 'Gold Membership',
        };
        membershipDisplay.textContent = levelNames[level] || level;
    }
});