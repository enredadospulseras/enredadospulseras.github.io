// ==================== DRAWER DE CARRITO ====================
// Inyecta el panel lateral del carrito y maneja la UI

import { obtenerCarrito, obtenerTotal, obtenerCantidadTotal, actualizarCantidad, eliminarItem, vaciarCarrito } from '/includes/carrito.js';
import { obtenerUsuarioActual } from '/includes/firebase.js';

// ---- Inyectar estilos ----
(function() {
    if (document.getElementById('carrito-drawer-styles')) return;
    const s = document.createElement('style');
    s.id = 'carrito-drawer-styles';
    s.textContent = `
        .carrito_drawer {
            position: fixed;
            top: 0;
            right: -420px;
            width: 420px;
            max-width: 100vw;
            height: 100vh;
            background: #fff;
            box-shadow: -8px 0 40px rgba(0,0,0,0.15);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
            font-family: 'Krub', sans-serif;
        }
        .carrito_drawer.abierto { right: 0; }

        .carrito_overlay_bg {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(2px);
            z-index: 1999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
        }
        .carrito_overlay_bg.activo { opacity: 1; visibility: visible; }

        .carrito_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.8rem 2rem;
            border-bottom: 2px solid #ffe4f1;
            background: linear-gradient(135deg, #fff5f8, #fff);
        }
        .carrito_header h2 {
            font-family: 'Staatliches', cursive;
            font-size: 2.4rem;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }
        .carrito_badge_header {
            background: #ff69b4;
            color: white;
            border-radius: 50%;
            width: 2.4rem;
            height: 2.4rem;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Krub', sans-serif;
            font-weight: 700;
        }
        .carrito_btn_cerrar {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 8px;
            color: #999;
            transition: all 0.2s;
            display: flex;
        }
        .carrito_btn_cerrar:hover { background: #f5f5f5; color: #333; transform: rotate(90deg); }
        .carrito_btn_cerrar svg { width: 22px; height: 22px; }

        .carrito_items {
            flex: 1;
            overflow-y: auto;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        .carrito_items::-webkit-scrollbar { width: 4px; }
        .carrito_items::-webkit-scrollbar-thumb { background: #ffb6d9; border-radius: 4px; }

        .carrito_vacio {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            padding: 4rem 2rem;
            color: #aaa;
            text-align: center;
        }
        .carrito_vacio_icono { font-size: 5rem; }
        .carrito_vacio p { font-size: 1.5rem; }
        .carrito_vacio a {
            background: #ff69b4;
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-size: 1.4rem;
            font-weight: 600;
            transition: background 0.2s;
        }
        .carrito_vacio a:hover { background: #e05ca0; }

        .carrito_item {
            display: grid;
            grid-template-columns: 75px 1fr auto;
            gap: 1rem;
            align-items: center;
            background: #fafafa;
            border-radius: 12px;
            padding: 1rem;
            border: 1px solid #f0f0f0;
            animation: itemEntrar 0.3s ease;
        }
        @keyframes itemEntrar { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: none; } }
        .carrito_item img {
            width: 75px;
            height: 75px;
            object-fit: cover;
            border-radius: 8px;
        }
        .carrito_item_info { min-width: 0; }
        .carrito_item_nombre {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2c3e50;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .carrito_item_opciones {
            font-size: 1.1rem;
            color: #888;
            margin-top: 0.2rem;
        }
        .carrito_item_precio {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ff69b4;
            margin-top: 0.4rem;
        }
        .carrito_item_controles { display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem; }
        .carrito_cantidad_ctrl {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            background: white;
            border: 1.5px solid #eee;
            border-radius: 8px;
            padding: 0.2rem;
        }
        .carrito_cantidad_ctrl button {
            width: 2.4rem;
            height: 2.4rem;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 6px;
            font-size: 1.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            transition: background 0.15s;
            line-height: 1;
        }
        .carrito_cantidad_ctrl button:hover { background: #ffe4f1; color: #ff69b4; }
        .carrito_cantidad_ctrl span {
            min-width: 2rem;
            text-align: center;
            font-size: 1.4rem;
            font-weight: 600;
        }
        .carrito_item_eliminar {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.3rem;
            border-radius: 4px;
            color: #ccc;
            transition: color 0.2s;
            display: flex;
        }
        .carrito_item_eliminar:hover { color: #ef4444; }
        .carrito_item_eliminar svg { width: 16px; height: 16px; }

        .carrito_footer {
            border-top: 2px solid #ffe4f1;
            padding: 1.5rem 2rem;
            background: #fff5f8;
        }
        .carrito_resumen {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            margin-bottom: 1.5rem;
        }
        .carrito_resumen_linea {
            display: flex;
            justify-content: space-between;
            font-size: 1.3rem;
            color: #666;
        }
        .carrito_resumen_linea.total {
            font-size: 1.7rem;
            font-weight: 700;
            color: #2c3e50;
            padding-top: 0.6rem;
            border-top: 1px solid #e0e0e0;
            margin-top: 0.4rem;
        }
        .carrito_resumen_linea.total span:last-child { color: #ff69b4; }
        .carrito_envio_gratis {
            text-align: center;
            font-size: 1.2rem;
            color: #10b981;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        .carrito_btn_checkout {
            display: block;
            width: 100%;
            padding: 1.3rem;
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.7rem;
            font-family: 'Staatliches', cursive;
            letter-spacing: 0.5px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            transition: all 0.2s;
            box-shadow: 0 4px 15px rgba(255,105,180,0.35);
        }
        .carrito_btn_checkout:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255,105,180,0.45);
        }
        .carrito_btn_vaciar {
            display: block;
            width: 100%;
            margin-top: 0.8rem;
            padding: 0.8rem;
            background: none;
            border: none;
            color: #aaa;
            font-size: 1.2rem;
            cursor: pointer;
            font-family: 'Krub', sans-serif;
            transition: color 0.2s;
        }
        .carrito_btn_vaciar:hover { color: #ef4444; }

        @media (max-width: 480px) {
            .carrito_drawer { width: 100vw; }
        }
    `;
    document.head.appendChild(s);
})();

// ---- Inyectar HTML del drawer ----
function inyectarDrawer() {
    if (document.getElementById('carrito-drawer')) return;
    const overlay = document.createElement('div');
    overlay.className = 'carrito_overlay_bg';
    overlay.id = 'carrito-overlay-bg';
    overlay.addEventListener('click', cerrarCarrito);

    const drawer = document.createElement('div');
    drawer.className = 'carrito_drawer';
    drawer.id = 'carrito-drawer';
    drawer.innerHTML = `
        <div class="carrito_header">
            <h2>Carrito <span class="carrito_badge_header" id="carrito-badge-header">0</span></h2>
            <button class="carrito_btn_cerrar" id="btn-cerrar-carrito" aria-label="Cerrar carrito">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <div class="carrito_items" id="carrito-items-container"></div>
        <div class="carrito_footer" id="carrito-footer" style="display:none;">
            <div class="carrito_resumen">
                <div class="carrito_resumen_linea">
                    <span>Subtotal</span><span id="carrito-subtotal">0,00 €</span>
                </div>
                <div class="carrito_resumen_linea">
                    <span>Envío</span><span id="carrito-envio">Calculado al finalizar</span>
                </div>
                <div class="carrito_resumen_linea total">
                    <span>Total estimado</span><span id="carrito-total">0,00 €</span>
                </div>
            </div>
            <div class="carrito_envio_gratis" id="carrito-envio-gratis" style="display:none;">
                🎉 ¡Envío gratis en tu pedido!
            </div>
            <button class="carrito_btn_checkout" id="btn-checkout">Finalizar Compra →</button>
            <button class="carrito_btn_vaciar" id="btn-vaciar-carrito">Vaciar carrito</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById('btn-cerrar-carrito').addEventListener('click', cerrarCarrito);
    document.getElementById('btn-checkout').addEventListener('click', irACheckout);
    document.getElementById('btn-vaciar-carrito').addEventListener('click', async () => {
        if (confirm('¿Vaciar el carrito?')) await vaciarCarrito();
    });
}

// ---- Render ----
function renderCarrito() {
    const items = obtenerCarrito();
    const container = document.getElementById('carrito-items-container');
    const footer = document.getElementById('carrito-footer');
    const badge = document.getElementById('carrito-badge-header');
    const navBadge = document.querySelector('.carrito_cantidad');
    const total = obtenerTotal();
    const cantidad = obtenerCantidadTotal();

    if (badge) badge.textContent = cantidad;
    if (navBadge) navBadge.textContent = cantidad;

    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `
            <div class="carrito_vacio">
                <div class="carrito_vacio_icono">🛍️</div>
                <p>Tu carrito está vacío</p>
                <a href="/index.html" onclick="cerrarCarrito()">Ver productos</a>
            </div>
        `;
        if (footer) footer.style.display = 'none';
        return;
    }

    container.innerHTML = items.map(item => {
        const opcionesStr = item.opciones ? Object.entries(item.opciones).map(([k,v]) => `${k}: ${v}`).join(', ') : '';
        return `
            <div class="carrito_item" data-id="${item.id}" data-opciones="${encodeURIComponent(JSON.stringify(item.opciones || {}))}">
                <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='/static/img/productos/1.jpeg'">
                <div class="carrito_item_info">
                    <p class="carrito_item_nombre">${item.nombre}</p>
                    ${opcionesStr ? `<p class="carrito_item_opciones">${opcionesStr}</p>` : ''}
                    <p class="carrito_item_precio">${(item.precio * item.cantidad).toFixed(2).replace('.',',')} €</p>
                </div>
                <div class="carrito_item_controles">
                    <div class="carrito_cantidad_ctrl">
                        <button class="btn-menos" aria-label="Quitar uno">−</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-mas" aria-label="Añadir uno">+</button>
                    </div>
                    <button class="carrito_item_eliminar" aria-label="Eliminar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Eventos de cantidad y eliminar
    container.querySelectorAll('.carrito_item').forEach(el => {
        const id = el.dataset.id;
        const opciones = JSON.parse(decodeURIComponent(el.dataset.opciones));
        const cantidadActual = parseInt(el.querySelector('span').textContent);

        el.querySelector('.btn-mas').addEventListener('click', () => actualizarCantidad(id, opciones, cantidadActual + 1));
        el.querySelector('.btn-menos').addEventListener('click', () => actualizarCantidad(id, opciones, cantidadActual - 1));
        el.querySelector('.carrito_item_eliminar').addEventListener('click', () => eliminarItem(id, opciones));
    });

    // Resumen
    if (footer) {
        footer.style.display = 'block';
        const subtotalEl = document.getElementById('carrito-subtotal');
        const totalEl = document.getElementById('carrito-total');
        const envioGratisEl = document.getElementById('carrito-envio-gratis');
        const envioEl = document.getElementById('carrito-envio');

        if (subtotalEl) subtotalEl.textContent = `${total.toFixed(2).replace('.',',')} €`;
        if (totalEl) totalEl.textContent = `${total.toFixed(2).replace('.',',')} €`;

        if (total >= 50) {
            if (envioEl) envioEl.textContent = 'GRATIS 🎉';
            if (envioGratisEl) envioGratisEl.style.display = 'block';
        } else {
            if (envioEl) envioEl.textContent = 'Calculado al finalizar';
            if (envioGratisEl) envioGratisEl.style.display = 'none';
        }
    }
}

// ---- Abrir / cerrar ----
export function abrirCarrito() {
    inyectarDrawer();
    renderCarrito();
    document.getElementById('carrito-drawer')?.classList.add('abierto');
    document.getElementById('carrito-overlay-bg')?.classList.add('activo');
    document.body.style.overflow = 'hidden';
}

export function cerrarCarrito() {
    document.getElementById('carrito-drawer')?.classList.remove('abierto');
    document.getElementById('carrito-overlay-bg')?.classList.remove('activo');
    document.body.style.overflow = '';
}

function irACheckout() {
    const user = obtenerUsuarioActual();
    if (!user) {
        cerrarCarrito();
        // Abrir modal auth
        document.getElementById('modal-auth')?.classList.add('activo');
        document.body.style.overflow = 'hidden';
        return;
    }
    window.location.href = '/pages/checkout.html';
}

// ---- Escuchar cambios ----
document.addEventListener('carritoActualizado', renderCarrito);

// ---- Inicializar badge ----
inyectarDrawer();

// Hacer global para el botón vacío
window.cerrarCarrito = cerrarCarrito;
