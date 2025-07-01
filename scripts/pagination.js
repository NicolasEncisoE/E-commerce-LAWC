const PRODUCTS_PER_PAGE = 18;

const renderPaginationHTML = (totalProducts, currentPage) => {
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  if (totalPages <= 1) return "";

  let html = `<nav><ul class="pagination justify-content-center"><li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item${i === currentPage ? " active" : ""}">
      <a class="page-link" href="#" data-page="${i}">${i}</a>
    </li>`;
  }
  html += `<li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li></ul></nav>`;
  return html;
}

export { PRODUCTS_PER_PAGE, renderPaginationHTML };
