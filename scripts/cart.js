const CART_KEY = 'miCarrito';

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function addToCart(producto) {
  const carrito = getCart();
  carrito.push(producto);
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
