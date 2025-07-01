/* Índice de importaciones de módulos de scripts JS */
import { displayProducts } from "./product-list.js";
import { renderSideNav } from './sidenav.js';
import { productosMock } from '../mocks/mockProductos.js';

const btnToggleCart = document.getElementById('btnToggleCart');
const container = document.getElementById('productosContainer');

export let productoActual = null;
export function setProductoActual(producto) {
  productoActual = producto;
}

fetch('/views/modals/modal-detail.html')
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    inicializarApp();
  })
  .catch(err => {
    console.error('Error cargando modal:', err);
  });

function inicializarApp() {
  btnToggleCart.addEventListener('click', () => {
    renderSideNav();
  });

  productosMock.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${producto.imagen}" class="card-img-top" style="max-height: 200px; object-fit: cover;" alt="${producto.titulo}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${producto.titulo}</h5>
        <p class="card-text text-success fw-bold">$${producto.precioUnitario}</p>
        <button class="btn btn-primary mt-auto btnVerDetalles">Ver detalles</button>
      </div>
    </div>
  `;
    const button = card.querySelector('.btnVerDetalles');
    button.addEventListener('click', () => abrirModalProducto(producto));
    container.appendChild(card);
  });
}

function abrirModalProducto(producto) {
  setProductoActual(producto);
  document.getElementById('productoModalLabel').innerText = producto.titulo;
  document.getElementById('productoImagen').src = producto.imagen;
  document.getElementById('productoPrecio').innerText = producto.precioUnitario;
  document.getElementById('productoDescripcion').innerText = `Cantidad disponible: ${producto.cantidad}`;
  const modal = new bootstrap.Modal(document.getElementById('productoModal'));
  modal.show();
}

displayProducts()