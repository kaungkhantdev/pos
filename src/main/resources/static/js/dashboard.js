document.addEventListener('DOMContentLoaded', function () {

    function closeAllModals() {
        document.querySelectorAll('.app-modal').forEach(function (modal) {
            modal.classList.add('hidden');
        });

        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open]').forEach(function (btn) {
        btn.addEventListener('click', function () {

            const id = btn.dataset.open;
            const modal = document.getElementById(id);

            if (!modal) {
                console.error('Modal not found:', id);
                return;
            }

            // Fill modal data
            Array.from(btn.attributes).forEach(function (attr) {

                if (
                    !attr.name.startsWith('data-') ||
                    attr.name === 'data-open'
                ) {
                    return;
                }

                const key = attr.name.replace('data-', '');

                const target = modal.querySelector(
                    `[data-fill="${key}"]`
                );

                if (!target) {
                    return;
                }

                if (target.type === 'checkbox') {
                    target.checked = attr.value === 'true';
                } else if (
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.tagName === 'SELECT'
                ) {
                    target.value = attr.value;
                } else {
                    target.textContent = attr.value;
                }
            });

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelectorAll('[data-close]').forEach(function (el) {
        el.addEventListener('click', closeAllModals);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });


    document.querySelectorAll('[data-open]').forEach(button => {

        button.addEventListener('click', () => {

            const modalId = button.dataset.open;
            const modal = document.getElementById(modalId);

            if (!modal) return;

            modal.querySelectorAll('[data-fill]').forEach(element => {

                const field = element.dataset.fill;
                const value = button.dataset[field] ?? '';

                if (element.tagName === 'INPUT' ||
                    element.tagName === 'TEXTAREA' ||
                    element.tagName === 'SELECT') {

                    element.value = value;

                } else {

                    element.textContent = value;

                }
            });

            // Edit URL
            if (modalId === 'editModal') {
                const id = button.dataset.id;

                document.getElementById('editTaskForm').action =
                    `/tasks/${id}/edit`;
            }

            // Delete URL
            if (modalId === 'deleteModal') {
                const id = button.dataset.id;

                document.getElementById('deleteTaskForm').action =
                    `/tasks/${id}/delete`;
            }

            modal.classList.remove('hidden');
        });
    });

});

