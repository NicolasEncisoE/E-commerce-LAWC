import { getCart, saveCart, removeFromCart, clearCart } from './cart.js';
import { showToast } from './utils.js';

export function renderSideNav() {
  fetch('./views/sidenav.html')
    .then(res => res.text())
    .then(html => {
      const sideNavContainer = document.getElementById('sideNavContainer');
      sideNavContainer.innerHTML = html;

      const sideNavElement = document.getElementById('sideNav');
      const btnCloseCart = document.getElementById('btnCloseSideNav');

      btnCloseCart.addEventListener('click', () => {
        sideNavElement.classList.remove('open');
      });

      renderCartItems();

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
    <div class="card mb-3 w-100 text-center">
      <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title mb-3">${prod.titulo}</h5>
        <img src="${prod.imagen}" alt="${prod.titulo}" class="img-fluid mb-3" style="max-height: 150px; object-fit: contain;">
        <p class="card-text mb-3">Precio: $${prod.precioUnitario}</p>
        <div class="d-flex align-items-center justify-content-between w-100 gap-3">
          <span class="fw-bold fs-5">${prod.cantidad}</span>
          <div class="d-flex gap-2">
            <button class="btn btn-primary btn-decrease" data-id="${prod.id}">-</button>
            <button class="btn btn-primary btn-increase" data-id="${prod.id}">+</button>
          </div>
          <button class="btn btn-danger btn-delete" data-id="${prod.id}">
            <i class="bi bi-trash text-white"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openModal({ htmlPath, modalId, onConfirm, onClose }) {
  fetch(htmlPath)
    .then(res => res.text())
    .then(html => {
      const modalContainer = document.getElementById('modalContainer');
      modalContainer.innerHTML = html;

      const modalElement = modalContainer.querySelector(`#${modalId}`);
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();

      const btnConfirm = modalElement.querySelector('[data-confirm-button]');
      if (btnConfirm) {
        btnConfirm.replaceWith(btnConfirm.cloneNode(true));
        modalElement.querySelector('[data-confirm-button]').addEventListener('click', () => {
          if (onConfirm) onConfirm();
          bootstrapModal.hide();
        });
      }

      modalElement.addEventListener('hidden.bs.modal', () => {
        if (onClose) onClose();
        modalContainer.innerHTML = '';
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      });
    });
}

function openDeleteModal() {
  openModal({
    htmlPath: './views/modals/modal-confirm-delete.html',
    modalId: 'confirmDeleteModal',
    onConfirm: () => {
      clearCart();
      showToast('Removed Products', 'All products have been removed from the cart');
      renderCartItems();
    },
    onClose: () => {
      const sideNavElement = document.getElementById('sideNav');
      if (sideNavElement) sideNavElement.classList.remove('open');
      renderCartItems();
    }
  });
}


// Modal para compra finalizada
function openSuccessPurchaseModal() {
  openModal({
    htmlPath: './views/modals/modal-success-purchase.html',
    modalId: 'successPurchaseModal',
    onClose: () => {
      clearCart();
      const sideNavElement = document.getElementById('sideNav');
      if (sideNavElement) sideNavElement.classList.remove('open');
      renderCartItems();
    }
  });
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'btnConfirmDelete') openDeleteModal();
  if (e.target && e.target.id === 'btnFinalizarCompra') openSuccessPurchaseModal();

  // Botón +
  if (e.target && e.target.classList.contains('btn-increase')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const carrito = getCart();

    const producto = carrito.find(p => p.id === id);
    if (producto) {
      producto.cantidad += 1;
      saveCart(carrito);
      renderCartItems();
    }
  }

  // Botón -
  if (e.target && e.target.classList.contains('btn-decrease')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    removeFromCart(id);
    renderCartItems();
  }

  // Botón eliminar producto completo
  if (e.target && e.target.classList.contains('btn-delete')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    let carrito = getCart();
    carrito = carrito.filter(p => p.id !== id);
    saveCart(carrito);
    showToast('Removed Product', 'The product was removed from the cart');
    renderCartItems();
  }
});
