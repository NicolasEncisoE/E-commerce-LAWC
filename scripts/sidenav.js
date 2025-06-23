const sideNavContainer = document.getElementById('sideNavContainer');

fetch('/views/sidenav.html')
    .then(res => res.text())
    .then(html => {
        sideNavContainer.innerHTML = html;

        const sideNavElement = document.getElementById('sideNav');
        const btnToggleCart = document.getElementById('btnToggleCart');
        const btnCloseSideNav = document.getElementById('btnCloseSideNav'); // ahora sí existe

        btnToggleCart.addEventListener('click', () => {
            if (sideNavElement.style.right === '0px') {
                sideNavElement.style.right = '-300px';
            } else {
                sideNavElement.style.right = '0px';
            }
        });

        btnCloseSideNav.addEventListener('click', () => {
            sideNavElement.style.right = '-300px';
        });
    })
    .catch(err => console.error('Error cargando el sidenav:', err));
