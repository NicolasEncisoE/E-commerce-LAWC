import { renderSideNav } from './sidenav.js';
import { productosMock } from '../mocks/mockProductos.js';
import { addToCart } from './cart.js';

const btnToggleCart = document.getElementById('btnToggleCart');
const container = document.getElementById('productosContainer');

fetch('/views/modals/modal-detail.html')
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    inicializarApp();
  })
  .catch(err => {
    console.error('Error cargando modal:', err);
  });

// Solo después que el modal esté insertado, inicializamos:
function inicializarApp() {
  // Evento para abrir el carrito lateral
  btnToggleCart.addEventListener('click', () => {
    renderSideNav();
  });

  // Generar las tarjetas de productos con evento para abrir modal
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

  // Función para abrir el modal con los datos del producto
  function abrirModalProducto(producto) {
    document.getElementById('productoModalLabel').innerText = producto.titulo;
    document.getElementById('productoImagen').src = producto.imagen;
    document.getElementById('productoPrecio').innerText = producto.precioUnitario;
    document.getElementById('productoDescripcion').innerText = `Cantidad disponible: ${producto.cantidad}`;

    const btnAgregar = document.getElementById('btnAgregarCarrito');

    // Remplazamos el botón por uno nuevo para eliminar event listeners previos
    const nuevoBtnAgregar = btnAgregar.cloneNode(true);
    btnAgregar.parentNode.replaceChild(nuevoBtnAgregar, btnAgregar);

    // Asignamos el nuevo listener sin riesgo de duplicados
    nuevoBtnAgregar.addEventListener('click', () => {
      addToCart(producto);

      Swal.fire({
        icon: 'success',
        title: '¡Agregado al carrito!',
        text: `"${producto.titulo}" se agregó correctamente.`,
        timer: 1500,
        showConfirmButton: false
      });

      const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
      modal.hide();
    });

    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    modal.show();
  }

