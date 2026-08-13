export function initModal(modalId, triggerSelector, closeSelector) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const closeBtn = modal.querySelector(closeSelector);
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.close());
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });

    document.querySelectorAll(triggerSelector).forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.showModal();
        });
    });
}