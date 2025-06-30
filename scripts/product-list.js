import { getProducts } from "./get-products.js";
import { PRODUCTS_PER_PAGE, renderPaginationHTML } from "./pagination.js";

/**
 * Muestra la lista de productos en el DOM.
 */
const displayProducts = async (page = 1) => {
  const products = await getProducts();
  const productList = document.querySelector("#product-list");

  if (products && products.length > 0) {
    productList.innerHTML = ""; // Limpia antes de agregar nuevos productos
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const productsToShow = products.slice(start, end);

    productsToShow.forEach((product) => {
      let productCard = `<div class="product-card col">
                            <img src="${product.image}" alt="${product.title}" />
                            <h6>${product.title}</h6>
                        </div>`;
      productList.innerHTML += productCard;
    });

    // Renderiza la paginación y agrega los eventos
    const pagination = document.querySelector("#pagination");
    pagination.innerHTML = renderPaginationHTML(products.length, page);
    pagination.querySelectorAll(".page-link").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        displayProducts(Number(btn.dataset.page));
      });
    });
  } else {
    productList.textContent = "No products available.";
  }
};

export { displayProducts };
