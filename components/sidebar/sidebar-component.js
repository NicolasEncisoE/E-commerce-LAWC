document.addEventListener("DOMContentLoaded", () => {

    // Productos de ejemplo
    const productos = [
        { id: 1, titulo: "Producto 1", precio: 100, imagen: "https://via.placeholder.com/60" },
        { id: 2, titulo: "Producto 2", precio: 150, imagen: "https://via.placeholder.com/60" },
        { id: 3, titulo: "Producto 3", precio: 200, imagen: "https://via.placeholder.com/60" }
    ];

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productList = document.getElementById("productList");
    const cartButton = document.getElementById("cartButton");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const clearCart = document.getElementById("clearCart");
    const checkout = document.getElementById("checkout");

    // Mostrar productos
    productos.forEach(producto => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        col.innerHTML = `
        <div class="card">
          <img src="${producto.imagen}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text">$${producto.precio}</p>
            <button class="btn btn-primary add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
          </div>
        </div>
      `;
        productList.appendChild(col);
    });

    // Evento abrir sidebar
    cartButton.addEventListener("click", () => {
        cartSidebar.classList.toggle("open");
        renderCart();
    });

    // Agregar producto
    document.addEventListener("click", e => {
        if (e.target.classList.contains("add-to-cart")) {
            const id = parseInt(e.target.dataset.id);
            const producto = productos.find(p => p.id === id);
            const existente = carrito.find(item => item.id === id);
            if (existente) {
                existente.cantidad++;
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }
            guardarCarrito();
            renderCart();
            Swal.fire('¡Agregado!', `${producto.titulo} fue agregado al carrito.`, 'success');
        }
    });

    // Renderizar carrito
    function renderCart() {
        cartItems.innerHTML = "";
        carrito.forEach(item => {
            const div = document.createElement("div");
            div.className = "cart-product";
            div.innerHTML = `
          <img src="${item.imagen}" />
          <div class="flex-grow-1">
            <h6>${item.titulo}</h6>
            <div class="input-group mb-2">
              <button class="btn btn-outline-secondary btn-sm decrease" data-id="${item.id}" ${item.cantidad === 1 ? "disabled" : ""}>-</button>
              <span class="mx-2">${item.cantidad}</span>
              <button class="btn btn-outline-secondary btn-sm increase" data-id="${item.id}">+</button>
            </div>
            <p class="mb-0">Precio: $${item.precio * item.cantidad}</p>
          </div>
          <button class="btn btn-danger btn-sm ms-2 delete" data-id="${item.id}"><i class="bi bi-trash"></i></button>
        `;
            cartItems.appendChild(div);
        });
        cartCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }

    // Evento botones dentro del carrito
    cartItems.addEventListener("click", e => {
        const id = parseInt(e.target.dataset.id);
        if (e.target.classList.contains("increase")) {
            const item = carrito.find(p => p.id === id);
            item.cantidad++;
            guardarCarrito();
            renderCart();
        }
        if (e.target.classList.contains("decrease")) {
            const item = carrito.find(p => p.id === id);
            if (item.cantidad > 1) {
                item.cantidad--;
                guardarCarrito();
                renderCart();
            }
        }
        if (e.target.classList.contains("delete") || e.target.closest('.delete')) {
            carrito = carrito.filter(p => p.id !== id);
            guardarCarrito();
            renderCart();
        }
    });

    // Limpiar carrito
    clearCart.addEventListener("click", () => {
        Swal.fire({
            title: '¿Eliminar todo?',
            text: "Se borrarán todos los productos del carrito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                guardarCarrito();
                renderCart();
                Swal.fire('Eliminado', 'El carrito ahora está vacío.', 'success');
            }
        });
    });

    // Finalizar compra
    checkout.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire('Carrito vacío', 'Agregá productos antes de finalizar la compra.', 'info');
            return;
        }
        Swal.fire('¡Gracias!', 'Compra finalizada con éxito.', 'success');
        carrito = [];
        guardarCarrito();
        renderCart();
    });

    // Guardar carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Render inicial
    renderCart();
});
