const CART_KEY = 'miCarrito';

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(carrito) {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

export function addToCart(producto) {
  const carrito = getCart();
  const existingProduct = carrito.find(p => p.id === producto.id);

  if (existingProduct) {
    existingProduct.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  saveCart(carrito);
}

export function removeFromCart(productId) {
  let carrito = getCart();
  const existingProduct = carrito.find(p => p.id === productId);

  if (existingProduct) {
    existingProduct.cantidad -= 1;

    if (existingProduct.cantidad <= 0) {
      // Eliminar producto del carrito si la cantidad es 0
      carrito = carrito.filter(p => p.id !== productId);
    }

    saveCart(carrito);
  }
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

