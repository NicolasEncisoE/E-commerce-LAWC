export function showToast(title, message) {
  const toastContainer = document.getElementById('toastContainer');

  const toastHTML = `
    <div class="toast text-white bg-success border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header bg-success text-white">
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHTML);

  const toastElement = toastContainer.querySelector('.toast:last-child');
  const toast = new bootstrap.Toast(toastElement);

  toast.show();

  // Eliminar el toast del DOM cuando se oculta
  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}
