// ==================== CUENTA.JS ====================
import { obtenerUsuarioActual, db, auth } from '/includes/firebase.js';
import { doc, setDoc, getDoc, collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// ---- Helpers ----
function mostrarNotif(msg, tipo = 'exito') {
    const n = document.createElement('div');
    const colores = { exito: '#10b981', error: '#ef4444', info: '#3b82f6' };
    n.style.cssText = `position:fixed;top:20px;right:20px;background:white;border-left:4px solid ${colores[tipo]};padding:16px 24px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);z-index:9999;font-size:1.4rem;font-family:Krub,sans-serif;max-width:380px;animation:slideIn .3s ease;`;
    const icono = tipo === 'exito' ? '✓' : tipo === 'error' ? '✕' : 'ℹ';
    n.innerHTML = `<span style="color:${colores[tipo]};font-weight:bold;margin-right:8px;">${icono}</span>${msg}`;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 4000);
}

function getVal(id) { return document.getElementById(id)?.value.trim() || ''; }
function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }

// ---- Tabs ----
document.querySelectorAll('.cuenta_tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.cuenta_tab').forEach(t => t.classList.remove('activo'));
        document.querySelectorAll('.cuenta_panel').forEach(p => p.classList.remove('activo'));
        tab.classList.add('activo');
        const panel = document.getElementById(`panel-${tab.dataset.panel}`);
        if (panel) {
            panel.classList.add('activo');
            if (tab.dataset.panel === 'pedidos') cargarPedidos();
        }
    });
});

// ---- Cargar datos de usuario ----
async function cargarDatosUsuario(user) {
    // Header
    const nombre = user.displayName || user.email.split('@')[0];
    const inicial = nombre[0].toUpperCase();
    const avatarEl = document.getElementById('cuenta-avatar');
    if (avatarEl) avatarEl.textContent = inicial;
    const nombreEl = document.getElementById('cuenta-nombre-display');
    if (nombreEl) nombreEl.textContent = nombre;
    const emailEl = document.getElementById('cuenta-email-display');
    if (emailEl) emailEl.textContent = user.email;

    // Cargar datos Firestore
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    const data = snap.exists() ? snap.data() : {};

    // MFA badge
    const mfaBadge = document.getElementById('cuenta-mfa-badge');
    if (mfaBadge && data.mfaConfigurado) mfaBadge.style.display = 'inline-flex';

    // Perfil
    setVal('perfil-nombre', user.displayName || '');
    setVal('perfil-email', user.email);
    setVal('perfil-telefono', data.telefono || '');
    setVal('perfil-fecha', data.fechaNacimiento || '');

    // Dirección
    if (data.direccion) {
        const d = data.direccion;
        setVal('dir-nombre', d.nombre);
        setVal('dir-telefono', d.telefono);
        setVal('dir-dni', d.dni);
        setVal('dir-calle', d.calle);
        setVal('dir-cp', d.cp);
        setVal('dir-ciudad', d.ciudad);
        setVal('dir-provincia', d.provincia);
        const paisEl = document.getElementById('dir-pais');
        if (paisEl) paisEl.value = d.pais || 'ES';
    }

    // Estado MFA
    renderMfaEstado(data.mfaConfigurado);
}

function renderMfaEstado(configurado) {
    const container = document.getElementById('mfa-estado-container');
    if (!container) return;
    if (configurado) {
        container.innerHTML = `
            <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
                <div style="background:#d1fae5;color:#065f46;padding:1rem 1.5rem;border-radius:10px;font-size:1.4rem;font-weight:600;">✅ Verificación en dos pasos activa</div>
                <p style="font-size:1.3rem;color:#666;">Tu cuenta está protegida con autenticación TOTP.</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <p style="font-size:1.4rem;color:#666;margin-bottom:1.5rem;">La verificación en dos pasos añade una capa extra de seguridad a tu cuenta.</p>
            <button id="btn-activar-2fa-cuenta" class="btn_guardar">Activar verificación en dos pasos</button>
        `;
        document.getElementById('btn-activar-2fa-cuenta')?.addEventListener('click', () => {
            // Disparar el setup de MFA del nav
            if (typeof iniciarSetupMfa === 'function') iniciarSetupMfa();
            else mostrarNotif('Cierra sesión e inicia de nuevo para configurar 2FA', 'info');
        });
    }
}

// ---- Guardar perfil ----
document.getElementById('btn-guardar-perfil')?.addEventListener('click', async () => {
    const user = obtenerUsuarioActual();
    if (!user) return;
    const btn = document.getElementById('btn-guardar-perfil');
    btn.disabled = true; btn.textContent = 'Guardando...';
    try {
        const nombre = getVal('perfil-nombre');
        if (nombre) await updateProfile(user, { displayName: nombre });
        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre,
            telefono: getVal('perfil-telefono'),
            fechaNacimiento: getVal('perfil-fecha'),
        }, { merge: true });
        // Actualizar header
        const nombreEl = document.getElementById('cuenta-nombre-display');
        if (nombreEl) nombreEl.textContent = nombre || user.email.split('@')[0];
        const avatarEl = document.getElementById('cuenta-avatar');
        if (avatarEl && nombre) avatarEl.textContent = nombre[0].toUpperCase();
        mostrarNotif('Perfil actualizado correctamente');
    } catch (err) {
        mostrarNotif('Error al guardar el perfil', 'error');
    } finally {
        btn.disabled = false; btn.textContent = 'Guardar cambios';
    }
});

// ---- Guardar dirección ----
document.getElementById('btn-guardar-direccion')?.addEventListener('click', async () => {
    const user = obtenerUsuarioActual();
    if (!user) return;
    const btn = document.getElementById('btn-guardar-direccion');
    btn.disabled = true; btn.textContent = 'Guardando...';
    try {
        const direccion = {
            nombre: getVal('dir-nombre'),
            telefono: getVal('dir-telefono'),
            dni: getVal('dir-dni'),
            calle: getVal('dir-calle'),
            cp: getVal('dir-cp'),
            ciudad: getVal('dir-ciudad'),
            provincia: getVal('dir-provincia'),
            pais: document.getElementById('dir-pais')?.value || 'ES',
        };
        await setDoc(doc(db, 'usuarios', user.uid), { direccion }, { merge: true });
        mostrarNotif('Dirección guardada correctamente');
    } catch (err) {
        mostrarNotif('Error al guardar la dirección', 'error');
    } finally {
        btn.disabled = false; btn.textContent = 'Guardar dirección';
    }
});

// ---- Reset password ----
document.getElementById('btn-reset-password')?.addEventListener('click', async () => {
    const user = obtenerUsuarioActual();
    if (!user) return;
    try {
        const { enviarEmailRecuperacion } = await import('/includes/firebase.js');
        const r = await enviarEmailRecuperacion(user.email);
        if (r.success) mostrarNotif('¡Correo enviado! Revisa tu bandeja de entrada');
        else mostrarNotif(r.error, 'error');
    } catch (e) {
        mostrarNotif('Error al enviar el correo', 'error');
    }
});

// ---- Cerrar sesión ----
document.getElementById('btn-cerrar-sesion-cuenta')?.addEventListener('click', async () => {
    try {
        const { cerrarSesion } = await import('/includes/firebase.js');
        await cerrarSesion();
        window.location.href = '/index.html';
    } catch (e) {
        mostrarNotif('Error al cerrar sesión', 'error');
    }
});

// ---- Cargar pedidos ----
async function cargarPedidos() {
    const user = obtenerUsuarioActual();
    if (!user) return;

    const loadingEl = document.getElementById('pedidos-loading');
    const containerEl = document.getElementById('pedidos-container');
    if (!loadingEl || !containerEl) return;

    loadingEl.style.display = 'block';
    containerEl.style.display = 'none';

    try {
        const q = query(
            collection(db, 'pedidos'),
            where('uid', '==', user.uid),
            orderBy('creadoEn', 'desc')
        );
        const snap = await getDocs(q);
        const pedidos = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        loadingEl.style.display = 'none';
        containerEl.style.display = 'block';

        if (pedidos.length === 0) {
            containerEl.innerHTML = `
                <div class="no_pedidos">
                    <p>📦 Aún no tienes pedidos</p>
                    <a href="/index.html">¡Empieza a comprar!</a>
                </div>
            `;
            return;
        }

        const estadoClase = { pendiente: 'estado-pendiente', confirmado: 'estado-confirmado', enviado: 'estado-enviado', entregado: 'estado-entregado' };
        const estadoLabel = { pendiente: '⏳ Pendiente', confirmado: '✅ Confirmado', enviado: '🚚 Enviado', entregado: '🎉 Entregado' };

        containerEl.innerHTML = pedidos.map(p => {
            const fecha = p.creadoEn?.toDate ? p.creadoEn.toDate().toLocaleDateString('es-ES') : '—';
            const items = (p.items || []).map(i => `
                <div class="pedido_item_mini">
                    <span>${i.nombre}</span>
                    <strong>×${i.cantidad}</strong>
                </div>
            `).join('');

            return `
                <div class="pedido_card">
                    <div class="pedido_header_card">
                        <span class="pedido_id">${p.numeroPedido || p.id.slice(0, 8).toUpperCase()}</span>
                        <span class="pedido_fecha">${fecha}</span>
                        <span class="pedido_estado ${estadoClase[p.estado] || 'estado-pendiente'}">${estadoLabel[p.estado] || p.estado}</span>
                    </div>
                    <div class="pedido_body_card">
                        <div class="pedido_items_mini">${items}</div>
                        <p class="pedido_total_card">${(p.total || 0).toFixed(2).replace('.', ',')} €</p>
                    </div>
                </div>
            `;
        }).join('');

    } catch (err) {
        console.error(err);
        loadingEl.style.display = 'none';
        containerEl.style.display = 'block';
        containerEl.innerHTML = '<p style="color:#ef4444;font-size:1.4rem;padding:2rem;">Error al cargar los pedidos. Inténtalo más tarde.</p>';
    }
}

// ---- Hash navigation (e.g. #pedidos) ----
function activarPanelDesdeHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const tab = document.querySelector(`.cuenta_tab[data-panel="${hash}"]`);
    if (tab) tab.click();
}

// ---- Init ----
let initDone = false;
onAuthStateChanged(auth, async (user) => {
    if (initDone) return;
    initDone = true;
    if (!user) { window.location.href = '/index.html'; return; }
    await cargarDatosUsuario(user);
    activarPanelDesdeHash();
});

window.addEventListener('hashchange', activarPanelDesdeHash);
