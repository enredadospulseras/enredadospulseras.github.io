document.getElementById("nav-placeholder").innerHTML = `
    <nav class="navegacion">
        <a href="index.html">
            <img class="header_logo" src="/static/img/logos/logo_completo.png" alt="Logotipo Enredados">
        </a>
        <div class="navegacion_enlaces">
            <a class="navegacion_enlace navegacion_enlace-activo" href="/index.html">Tienda</a>
            <a class="navegacion_enlace" href="/pages/nosotros.html">Nosotros</a>
            <a class="navegacion_enlace" href="#contacto">Contacto</a>
        </div>
        <button class="btn_carrito" aria-label="Carrito de compras">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="carrito_icono">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span class="carrito_cantidad">0</span>
        </button>
    </nav>
`;
