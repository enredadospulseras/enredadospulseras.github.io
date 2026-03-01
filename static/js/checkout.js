// ==================== CHECKOUT JS ====================
import { obtenerCarrito, obtenerTotal, vaciarCarrito } from '/includes/carrito.js';
import { obtenerUsuarioActual, db } from '/includes/firebase.js';
import { doc, setDoc, getDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// ---- Guard: redirigir si carrito vacío o no logueado ----
function verificarAcceso() {
    const user = obtenerUsuarioActual();
    if (!user) { window.location.href = '/index.html'; return false; }
    const items = obtenerCarrito();
    if (items.length === 0) { window.location.href = '/index.html'; return false; }
    return true;
}

// ---- Cargar dirección guardada ----
async function cargarDireccion() {
    const user = obtenerUsuarioActual();
    if (!user) return;
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    if (snap.exists() && snap.data().direccion) {
        const d = snap.data().direccion;
        setValue('checkout-nombre', d.nombre || user.displayName || '');
        setValue('checkout-telefono', d.telefono || '');
        setValue('checkout-dni', d.dni || '');
        setValue('checkout-calle', d.calle || '');
        setValue('checkout-cp', d.cp || '');
        setValue('checkout-ciudad', d.ciudad || '');
        setValue('checkout-provincia', d.provincia || '');
        setValue('checkout-pais', d.pais || 'ES');
    } else {
        setValue('checkout-nombre', user.displayName || '');
    }
}

function setValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
}

// ---- Renderizar resumen ----
function renderResumen() {
    const items = obtenerCarrito();
    const total = obtenerTotal();
    const envio = total >= 50 ? 0 : (total > 0 ? 3.95 : 0);

    const container = document.getElementById('resumen-items');
    if (container) {
        container.innerHTML = items.map(item => `
            <div class="resumen_item">
                <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='/static/img/productos/1.jpeg'">
                <div class="resumen_item_info">
                    <p class="resumen_item_nombre">${item.nombre}</p>
                    <p class="resumen_item_qty">× ${item.cantidad}</p>
                </div>
                <span class="resumen_item_precio">${(item.precio * item.cantidad).toFixed(2).replace('.', ',')} €</span>
            </div>
        `).join('');
    }

    const subtotalEl = document.getElementById('resumen-subtotal');
    const envioEl = document.getElementById('resumen-envio');
    const totalEl = document.getElementById('resumen-total');

    if (subtotalEl) subtotalEl.textContent = `${total.toFixed(2).replace('.',',')} €`;
    if (envioEl) envioEl.textContent = envio === 0 ? 'GRATIS 🎉' : `${envio.toFixed(2).replace('.',',')} €`;
    if (totalEl) totalEl.textContent = `${(total + envio).toFixed(2).replace('.',',')} €`;
}

// ---- Métodos de pago: mostrar info ----
document.querySelectorAll('input[name="pago"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelectorAll('.pago_info_box').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.pago_opcion').forEach(el => el.classList.remove('pago_opcion-activo'));

        radio.closest('.pago_opcion').classList.add('pago_opcion-activo');
        const infoEl = document.getElementById(`info-${radio.value}`);
        if (infoEl) infoEl.style.display = 'block';
    });
});

// ---- Confirmar pedido ----
document.getElementById('btn-confirmar-pedido')?.addEventListener('click', async () => {
    const user = obtenerUsuarioActual();
    if (!user) { window.location.href = '/index.html'; return; }

    // Validar campos requeridos
    const campos = ['checkout-nombre', 'checkout-calle', 'checkout-cp', 'checkout-ciudad', 'checkout-provincia'];
    const vacios = campos.filter(id => !document.getElementById(id)?.value.trim());
    if (vacios.length) {
        mostrarAlerta('Por favor, completa todos los campos obligatorios (*)');
        document.getElementById(vacios[0])?.focus();
        return;
    }

    if (!document.getElementById('aceptar-terminos')?.checked) {
        mostrarAlerta('Debes aceptar los términos y condiciones');
        return;
    }

    const btn = document.getElementById('btn-confirmar-pedido');
    btn.disabled = true;
    btn.textContent = 'Procesando pedido...';

    try {
        const items = obtenerCarrito();
        const total = obtenerTotal();
        const envio = total >= 50 ? 0 : 3.95;
        const metodoPago = document.querySelector('input[name="pago"]:checked')?.value || 'transferencia';

        const direccion = {
            nombre: document.getElementById('checkout-nombre')?.value.trim(),
            telefono: document.getElementById('checkout-telefono')?.value.trim(),
            dni: document.getElementById('checkout-dni')?.value.trim(),
            calle: document.getElementById('checkout-calle')?.value.trim(),
            cp: document.getElementById('checkout-cp')?.value.trim(),
            ciudad: document.getElementById('checkout-ciudad')?.value.trim(),
            provincia: document.getElementById('checkout-provincia')?.value.trim(),
            pais: document.getElementById('checkout-pais')?.value,
        };

        const numeroPedido = 'ENR-' + Date.now().toString(36).toUpperCase();

        const pedido = {
            numeroPedido,
            uid: user.uid,
            email: user.email,
            nombre: user.displayName,
            items,
            direccion,
            nota: document.getElementById('checkout-nota')?.value.trim() || '',
            metodoPago,
            subtotal: total,
            envio,
            total: total + envio,
            estado: 'pendiente',
            creadoEn: new Date(),
        };

        // Guardar pedido en Firestore
        await addDoc(collection(db, 'pedidos'), pedido);

        // Guardar dirección si marcó la opción
        if (document.getElementById('guardar-dir')?.checked) {
            await setDoc(doc(db, 'usuarios', user.uid), { direccion }, { merge: true });
        }

        // Vaciar carrito
        await vaciarCarrito();

        // Mostrar confirmación
        mostrarConfirmacion(numeroPedido, metodoPago);

    } catch (err) {
        console.error(err);
        mostrarAlerta('Error al procesar el pedido. Inténtalo de nuevo.');
        btn.disabled = false;
        btn.textContent = 'Confirmar pedido';
    }
});

function mostrarAlerta(msg) {
    const n = document.createElement('div');
    n.style.cssText = 'position:fixed;top:20px;right:20px;background:white;border-left:4px solid #ef4444;padding:16px 24px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);z-index:9999;font-size:1.4rem;font-family:Krub,sans-serif;max-width:380px;';
    n.textContent = '⚠️ ' + msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 4000);
}

function mostrarConfirmacion(numeroPedido, metodoPago) {
    const instrucciones = {
        transferencia: 'Enviaremos los datos bancarios a tu correo. El pedido se procesará al recibir el pago.',
        bizum: 'Enviaremos el número de Bizum a tu correo para completar el pago.',
        paypal: 'Recibirás un enlace de PayPal en tu correo para completar el pago.'
    };

    document.querySelector('.checkout_main').innerHTML = `
        <div class="confirmacion_container">
            <div class="confirmacion_icono">🎉</div>
            <h1>¡Pedido confirmado!</h1>
            <p>Gracias por tu compra. Hemos recibido tu pedido y te enviaremos una confirmación a <strong>${obtenerUsuarioActual()?.email}</strong>.</p>
            <p>${instrucciones[metodoPago] || ''}</p>
            <div class="confirmacion_numero">
                <p>Número de pedido</p>
                <strong>${numeroPedido}</strong>
            </div>
            <div class="confirmacion_acciones">
                <a href="/index.html" class="btn_ir_tienda">Seguir comprando</a>
                <a href="/pages/cuenta.html" class="btn_ver_pedidos">Ver mis pedidos</a>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// ---- Init ----
(async function init() {
    // Esperar un tick para que Firebase auth cargue
    await new Promise(r => setTimeout(r, 800));
    if (!verificarAcceso()) return;
    await cargarDireccion();
    renderResumen();
    document.addEventListener('carritoActualizado', renderResumen);
})();
