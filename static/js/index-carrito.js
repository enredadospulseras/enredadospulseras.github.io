// ==================== CARRITO DESDE INDEX ====================
// Añadir al carrito rápidamente desde la página principal

import { agregarItem } from '/includes/carrito.js';
import { abrirCarrito } from '/includes/carritoDrawer.js';

// Datos de productos
const PRODUCTOS = {
    'pulsera-cuentas-letra': { nombre: 'Pulsera de cuentas con letra personalizada', precio: 1.00, imagen: '/static/img/productos/1.jpeg' },
    'pulsera-cuentas-corazon': { nombre: 'Pulsera de cuentas con corazón', precio: 1.00, imagen: '/static/img/productos/2.jpeg' },
    'pulsera-adn': { nombre: 'Pulsera ADN con letras personalizadas', precio: 2.00, imagen: '/static/img/productos/3.jpeg' },
    'pulsera-scooby': { nombre: 'Pulsera cuadrada de Scooby Doo', precio: 2.50, imagen: '/static/img/productos/4.jpeg' },
    'pulsera-espiral': { nombre: 'Pulsera de espiral', precio: 1.00, imagen: '/static/img/productos/5.jpeg' },
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn_agregar[data-producto-id]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = btn.dataset.productoId;
            const prod = PRODUCTOS[id];
            if (!prod) return;

            btn.textContent = '✓ Añadido';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            btn.style.color = 'white';

            await agregarItem({ id, ...prod, cantidad: 1 });

            setTimeout(() => {
                btn.textContent = 'Añadir al carrito';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);

            setTimeout(() => abrirCarrito(), 400);
        });
    });
});
