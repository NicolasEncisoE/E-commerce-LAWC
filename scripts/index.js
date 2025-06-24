import { addToCart } from './cart.js';
import { renderSideNav } from './sidenav.js';
import { productosMock } from '../mocks/mockProductos.js';

const btnAgregarProducto = document.getElementById('btnAgregarProducto');
const btnToggleCart = document.getElementById('btnToggleCart');

btnAgregarProducto.addEventListener('click', () => {
  productosMock.forEach(producto => {
    addToCart(producto);
  });
  alert(`Se agregaron ${productosMock.length} productos al carrito`);
});

btnToggleCart.addEventListener('click', () => {
  renderSideNav();
});
