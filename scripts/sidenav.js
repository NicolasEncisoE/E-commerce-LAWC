import { getCart, clearCart } from './cart.js';

export function renderSideNav() {
  fetch('./views/sidenav.html')
    .then(res => res.text())
    .then(html => {
      const sideNavContainer = document.getElementById('sideNavContainer');
      sideNavContainer.innerHTML = html;

      const sideNavElement = document.getElementById('sideNav');
      const btnCloseCart = document.getElementById('btnCloseSideNav');

      // Al hacer click en cerrar, saco la clase open para ocultar
      btnCloseCart.addEventListener('click', () => {
        sideNavElement.classList.remove('open');
      });

      renderCartItems();

      // Abro el sidenav agregando clase
      sideNavElement.classList.add('open');
    });
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cartItems');
  const carrito = getCart();

  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  cartItemsContainer.innerHTML = carrito.map(prod => `
    <div class="border p-2 mb-2">
      <h5>${prod.titulo}</h5>
      <p>Precio: $${prod.precio}</p>
    </div>
  `).join('');
}

function openDeleteModal() {
  fetch('./views/modals/modal-confirm-delete.html')
    .then(res => res.text())
    .then(html => {
      const modalContainer = document.getElementById('modalContainer');
      modalContainer.innerHTML = html;

      const modalElement = modalContainer.querySelector('#confirmDeleteModal');
      const bootstrapModal = new bootstrap.Modal(modalElement);

      bootstrapModal.show();

      // Removemos listeners previos para evitar duplicados (si es que abris el modal varias veces)
      modalElement.querySelector('#btnConfirmDelete').replaceWith(modalElement.querySelector('#btnConfirmDelete').cloneNode(true));

      modalElement.querySelector('#btnConfirmDelete').addEventListener('click', () => {
        console.log('Compra eliminada');
        clearCart();
        bootstrapModal.hide();
      });

 modalElement.addEventListener('hidden.bs.modal', () => {
  console.log('Modal cerrado, limpiando contenido y actualizando vista');
  modalContainer.innerHTML = '';
  renderCartItems();

  // Forzar remover backdrop (por si quedó pegado)
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) backdrop.remove();
});

    });
}



document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'btnConfirmDelete') {
    openDeleteModal();
  }
});


document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'btnEliminarCompra') {
    openDeleteModal();
  }
});
