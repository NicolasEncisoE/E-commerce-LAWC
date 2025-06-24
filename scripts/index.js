import { addToCart } from './cart.js';
import { renderSideNav } from './sidenav.js';

const btnAgregarProducto = document.getElementById('btnAgregarProducto');
const btnToggleCart = document.getElementById('btnToggleCart');

btnAgregarProducto.addEventListener('click', () => {
  const productoSimulado = {
    id: Date.now(), // ID único
    titulo: 'Producto demo',
    precio: 123,
  };

  addToCart(productoSimulado);
  alert('Producto agregado al carrito');
});

btnToggleCart.addEventListener('click', () => {
  renderSideNav();
});
