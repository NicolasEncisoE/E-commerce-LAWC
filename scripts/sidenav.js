const sideNavContainer = document.getElementById('sideNavContainer');

fetch('/views/sidenav.html')
    .then(res => res.text())
    .then(html => {
        sideNavContainer.innerHTML = html;
        const sideNavElement = document.getElementById('sideNav');
        const btnToggleCart = document.getElementById('btnToggleCart');

        btnToggleCart.addEventListener('click', () => {
            if (sideNavElement.style.right === '0px') {
                sideNavElement.style.right = '-300px';
            } else {
                sideNavElement.style.right = '0px';
            }
        });
    })
    .catch(err => console.error('Error cargando el sidenav:', err));
