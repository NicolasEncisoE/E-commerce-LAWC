const modalContainer = document.getElementById('modalContainer');

fetch('/views/modals/modal-confirm-delete.html')
    .then(res => res.text())
    .then(html => {
        modalContainer.innerHTML = html;

        const btnConfirmDelete = document.getElementById('btnConfirmDelete');
        const productos = ['Producto 1', 'Producto 2', 'Producto 3']; // o importarlo de cart.js

        btnConfirmDelete.addEventListener('click', () => {
            console.log('Compra eliminada:', productos);
            // productos.length = 0;

            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
            deleteModal.hide();
        });
    })
    .catch(err => console.error('Error cargando el modal de confirmación:', err));
