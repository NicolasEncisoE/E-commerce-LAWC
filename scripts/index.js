document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openSidenavBtn');
  const container = document.getElementById('sidenav-container');

  openBtn.addEventListener('click', () => {
    // Cargar sidenav.html solo si no está cargado
    if (!document.getElementById('mySidenav')) {
      fetch('sidenav.html')
        .then(res => res.text())
        .then(html => {
          container.innerHTML = html;
          // Aquí NO se toca la lógica del sidenav,
          // porque está en scripts/sidenav.js y se carga desde sidenav.html
        });
    }
  });
});
