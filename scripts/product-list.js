import { getProducts } from "./get-products.js";
import { PRODUCTS_PER_PAGE, renderPaginationHTML } from "./pagination.js";
import { abrirModalProducto } from "./modal.js";

let cachedProducts = []; // Para no hacer múltiples fetch
let currentSearch = ""; // Guardar búsqueda actual

/**
 * Muestra la lista de productos en el DOM, con búsqueda y paginación.
 */
const displayProducts = async (page = 1, searchTerm = "") => {
  // Solo carga productos si aún no están en caché
  if (cachedProducts.length === 0) {
    cachedProducts = await getProducts();
  }

  const productList = document.querySelector("#product-list");
  let filteredProducts = cachedProducts;

  if (searchTerm) {
    filteredProducts = cachedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filteredProducts.length > 0) {
    productList.innerHTML = "";
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const productsToShow = filteredProducts.slice(start, end);

    productsToShow.forEach((product) => {
      const productCard = `<div class="product-card col" data-id="${product.id}">
                              <img src="${product.image}" alt="${product.title}" />
                              <h6>${product.title}</h6>
                            </div>`;
      productList.innerHTML += productCard;
    });

    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        const producto = cachedProducts.find((p) => String(p.id) === id);
        if (producto) {
          abrirModalProducto(producto);
        }
      });
    });

    // Paginación
    const pagination = document.querySelector("#pagination");
    pagination.innerHTML = renderPaginationHTML(filteredProducts.length, page);
    pagination.querySelectorAll(".page-link").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        displayProducts(Number(btn.dataset.page), currentSearch);
      });
    });
  } else {
    productList.textContent = "No products found.";
    document.querySelector("#pagination").innerHTML = "";
  }
};

/**
 * Inicializa el buscador de productos.
 */
const initSearch = () => {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", (e) => {
    currentSearch = e.target.value.trim();
    displayProducts(1, currentSearch);
  });
};

export { displayProducts, initSearch };
