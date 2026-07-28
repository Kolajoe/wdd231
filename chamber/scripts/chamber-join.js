document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toLocaleString();
    }
});

document.addEventListener('DOMContentLoader', function() {
    const modals = document.querySelectorAll('.membership-modal');
    const learnMoreLinks = document.querySelectorAll('.learn-more');
    const closeButtons = document.querySelectorAll('.close-modal');

    function openModal(modalId) {
        if (modal) {
            modal.showModal();
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.close();
            document.body.style.overflow = '';
        }
    }

    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.dataset.modal;
            openModal(modalId);
        });
    });

    closeButtons.forEach(modal => {
        button.addEventListener('click', function(e) {
            const modal = this.closest('.membership-modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toLocaleString();
    }

});