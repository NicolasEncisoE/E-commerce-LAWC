import { renderSideNav } from './sidenav.js';
import { getProducts } from './get-products.js';

const btnToggleCart = document.getElementById('btnToggleCart');
document.body.addEventListener('hidden.bs.modal', function (event) {
  if (event.target.id === 'productoModal') {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
  }
});


let productoActual = null;
function setProductoActual(producto) {
  productoActual = producto;
}

fetch('views/modals/modal-detail.html')
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    inicializarApp();
  })
  .catch(err => {
    console.error('Error cargando modal:', err);
  });

async function inicializarApp() {
  btnToggleCart.addEventListener('click', () => {
    renderSideNav();
  });

  const productos = await getProducts();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((productCard, idx) => {
    productCard.addEventListener('click', () => abrirModalProducto(productos[idx]));
  });
}

function abrirModalProducto(producto) {
  setProductoActual(producto);
  document.getElementById('productoModalLabel').innerText = producto.title;
  document.getElementById('productoImagen').src = producto.image;
  document.getElementById('productoPrecio').innerText = producto.price;
  document.getElementById('productoDescripcion').innerText = producto.description;
  const modal = new bootstrap.Modal(document.getElementById('productoModal'));
  modal.show();
}

export { abrirModalProducto, setProductoActual, productoActual };