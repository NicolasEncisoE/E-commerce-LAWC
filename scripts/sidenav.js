const sideNavContainer = document.getElementById('sideNavContainer');

fetch('/views/sidenav.html')
    .then(res => res.text())
    .then(html => {
        sideNavContainer.innerHTML = html;

        const sideNavElement = document.getElementById('sideNav');
        const btnToggleCart = document.getElementById('btnToggleCart');
        const btnCloseSideNav = document.getElementById('btnCloseSideNav');
        const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
        const btnEliminarCompra = document.getElementById('btnEliminarCompra');

        const productos = ['Producto 1', 'Producto 2', 'Producto 3'];

        btnToggleCart.addEventListener('click', () => {
            if (sideNavElement.style.right === '0px') {
                sideNavElement.style.right = '-300px';
            } else {
                sideNavElement.style.right = '0px';
            }
        });

        btnCloseSideNav.addEventListener('click', () => {
            sideNavElement.style.right = '-300px';
        });

        btnFinalizarCompra.addEventListener('click', () => {
            console.log('Finalizando compra con productos:', productos);
        });

        btnEliminarCompra.addEventListener('click', () => {
            const modalElement = document.getElementById('confirmDeleteModal');
            if (modalElement) {
                const deleteModal = new bootstrap.Modal(modalElement);
                deleteModal.show();
            } else {
                console.error('Modal de confirmación no encontrado');
            }
        });

    })
    .catch(err => console.error('Error cargando el sidenav:', err));
