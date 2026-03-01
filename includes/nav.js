// ==================== NAVEGACIÓN ====================
document.getElementById("nav-placeholder").innerHTML = `
    <nav class="navegacion">
        <a href="/index.html" class="logo-link">
            <img class="header_logo" src="/static/img/logos/logo_completo.png" alt="Logotipo Enredados">
        </a>
        <button class="btn_hamburguesa" aria-label="Menú">
            <span></span><span></span><span></span>
        </button>
        <div class="navegacion_menu">
            <div class="navegacion_enlaces">
                <a class="navegacion_enlace navegacion_enlace-activo" href="/index.html">Tienda</a>
                <a class="navegacion_enlace" href="/pages/nosotros.html">Nosotros</a>
                <a class="navegacion_enlace" href="#contacto">Contacto</a>
            </div>
            <div class="navegacion_acciones">
                <button class="btn_usuario" aria-label="Usuario">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="usuario_icono">
                        <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                    </svg>
                    <span class="btn_texto">Cuenta</span>
                </button>
                <button class="btn_carrito" aria-label="Carrito de compras">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="carrito_icono">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span class="carrito_cantidad">0</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- ===== MODAL AUTH ===== -->
    <div class="modal_overlay" id="modal-auth">
        <div class="modal_contenido">
            <button class="modal_cerrar" id="cerrar-modal-auth" aria-label="Cerrar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <div class="auth_tabs">
                <button class="auth_tab auth_tab-activo" data-tab="login">Iniciar Sesión</button>
                <button class="auth_tab" data-tab="registro">Registrarse</button>
            </div>

            <!-- Login -->
            <form class="auth_form auth_form-activo" id="form-login">
                <h2 class="auth_titulo">Bienvenido de nuevo</h2>
                <div class="form_grupo">
                    <label for="login-email" class="form_label">Correo electrónico</label>
                    <input type="email" id="login-email" class="form_input" placeholder="tu@email.com" required>
                </div>
                <div class="form_grupo">
                    <label for="login-password" class="form_label">Contraseña</label>
                    <div class="input_password">
                        <input type="password" id="login-password" class="form_input" placeholder="••••••••" required>
                        <button type="button" class="btn_ver_password">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="form_extras">
                    <label class="checkbox_label">
                        <input type="checkbox" id="recordar"><span>Recordarme</span>
                    </label>
                    <a href="#" class="link_recuperar" id="link-olvidar-password">¿Olvidaste tu contraseña?</a>
                </div>
                <button type="submit" class="btn_submit">Iniciar Sesión</button>
                <div class="auth_divider"><span>o continúa con</span></div>
                <div class="auth_redes">
                    <button type="button" class="btn_red btn_red-google" id="btn-google-login">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>
                </div>
            </form>

            <!-- Registro -->
            <form class="auth_form" id="form-registro">
                <h2 class="auth_titulo">Crear cuenta nueva</h2>
                <div class="form_grupo">
                    <label for="registro-nombre" class="form_label">Nombre completo</label>
                    <input type="text" id="registro-nombre" class="form_input" placeholder="Tu Nombre" required>
                </div>
                <div class="form_grupo">
                    <label for="registro-email" class="form_label">Correo electrónico</label>
                    <input type="email" id="registro-email" class="form_input" placeholder="tu@email.com" required>
                </div>
                <div class="form_grupo">
                    <label for="registro-password" class="form_label">Contraseña</label>
                    <div class="input_password">
                        <input type="password" id="registro-password" class="form_input" placeholder="Mínimo 8 caracteres" required minlength="8">
                        <button type="button" class="btn_ver_password">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                    <small class="form_ayuda">Debe tener al menos 8 caracteres</small>
                </div>
                <div class="form_grupo">
                    <label for="registro-password-confirmar" class="form_label">Confirmar contraseña</label>
                    <div class="input_password">
                        <input type="password" id="registro-password-confirmar" class="form_input" placeholder="Repite tu contraseña" required minlength="8">
                        <button type="button" class="btn_ver_password">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <label class="checkbox_label">
                    <input type="checkbox" id="terminos" required>
                    <span>Acepto los <a href="/pages/terminos.html">términos y condiciones</a></span>
                </label>
                <button type="submit" class="btn_submit">Crear Cuenta</button>
                <div class="auth_divider"><span>o continúa con</span></div>
                <div class="auth_redes">
                    <button type="button" class="btn_red btn_red-google" id="btn-google-registro">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- ===== MODAL MFA SETUP ===== -->
    <div class="modal_overlay" id="modal-mfa-setup">
        <div class="modal_contenido modal_mfa">
            <div class="mfa_header">
                <div class="mfa_icon_wrap">🔐</div>
                <h2 class="auth_titulo">Configura tu verificación en dos pasos</h2>
                <p class="mfa_subtitulo">Es obligatorio para proteger tu cuenta. Solo toma un minuto.</p>
            </div>
            <div class="mfa_pasos">
                <div class="mfa_paso">
                    <div class="paso_numero">1</div>
                    <div class="paso_contenido">
                        <h3>Descarga una app autenticadora</h3>
                        <div class="apps_lista">
                            <span class="app_chip">Google Authenticator</span>
                            <span class="app_chip">Microsoft Authenticator</span>
                            <span class="app_chip">Authy</span>
                        </div>
                    </div>
                </div>
                <div class="mfa_paso">
                    <div class="paso_numero">2</div>
                    <div class="paso_contenido">
                        <h3>Escanea este código QR</h3>
                        <div class="qr_container">
                            <div id="qr-loading" class="qr_loading">
                                <div class="spinner_mfa"></div>
                                <span>Generando código...</span>
                            </div>
                            <div id="qr-code-div" style="display:none;"></div>
                        </div>
                        <details class="clave_manual_wrap">
                            <summary>¿No puedes escanear? Ingresa el código manual</summary>
                            <div class="clave_manual">
                                <code id="totp-secret-display">---</code>
                                <button type="button" class="btn_copiar" id="btn-copiar-clave">Copiar</button>
                            </div>
                        </details>
                    </div>
                </div>
                <div class="mfa_paso">
                    <div class="paso_numero">3</div>
                    <div class="paso_contenido">
                        <h3>Ingresa el código de 6 dígitos</h3>
                        <input type="text" id="mfa-setup-codigo" class="form_input codigo_totp_input" 
                               placeholder="000000" maxlength="6" inputmode="numeric" autocomplete="one-time-code">
                    </div>
                </div>
            </div>
            <div id="mfa-setup-error" class="mfa_error" style="display:none;"></div>
            <button type="button" class="btn_submit" id="btn-activar-mfa">Activar verificación en dos pasos</button>
            <p class="mfa_nota">Tu cuenta quedará protegida con esta configuración</p>
        </div>
    </div>

    <!-- ===== MODAL MFA VERIFICAR (al hacer login) ===== -->
    <div class="modal_overlay" id="modal-mfa-login">
        <div class="modal_contenido modal_mfa_login">
            <div class="mfa_header">
                <div class="mfa_icon_wrap">🔑</div>
                <h2 class="auth_titulo">Verificación en dos pasos</h2>
                <p class="mfa_subtitulo">Ingresa el código de 6 dígitos de tu app autenticadora</p>
            </div>
            <input type="text" id="mfa-login-codigo" class="form_input codigo_totp_input" 
                   placeholder="000000" maxlength="6" inputmode="numeric" autocomplete="one-time-code"
                   style="margin-top: 2rem;">
            <div id="mfa-login-error" class="mfa_error" style="display:none; margin-top:1rem;"></div>
            <button type="button" class="btn_submit" id="btn-verificar-mfa-login" style="margin-top:1.5rem;">Verificar</button>
            <button type="button" class="btn_link" id="btn-cancelar-mfa-login">Cancelar</button>
        </div>
    </div>

    <!-- ===== MODAL RECUPERAR CONTRASEÑA ===== -->
    <div class="modal_overlay" id="modal-recuperar">
        <div class="modal_contenido">
            <button class="modal_cerrar" id="cerrar-modal-recuperar" aria-label="Cerrar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <div id="recuperar-step-1">
                <div class="mfa_header">
                    <div class="mfa_icon_wrap">📧</div>
                    <h2 class="auth_titulo">Recuperar contraseña</h2>
                    <p class="mfa_subtitulo">Te enviaremos un correo para restablecer tu contraseña</p>
                </div>
                <div class="form_grupo" style="margin-top:2rem;">
                    <label for="recuperar-email" class="form_label">Correo electrónico</label>
                    <input type="email" id="recuperar-email" class="form_input" placeholder="tu@email.com">
                </div>
                <div id="recuperar-error" class="mfa_error" style="display:none;"></div>
                <button type="button" class="btn_submit" id="btn-enviar-recuperacion">Enviar correo</button>
                <button type="button" class="btn_link" id="btn-volver-login">← Volver al login</button>
            </div>
            <div id="recuperar-step-2" style="display:none; text-align:center; padding:2rem 0;">
                <div class="mfa_icon_wrap" style="font-size:4rem; margin-bottom:1.5rem;">✉️</div>
                <h2 class="auth_titulo">¡Correo enviado!</h2>
                <p class="mfa_subtitulo" style="margin-top:1rem;">Revisa tu bandeja de entrada y sigue las instrucciones.</p>
                <p style="font-size:1.3rem; color:var(--gris); margin-top:0.8rem;">Si no lo ves, revisa la carpeta de spam.</p>
                <button type="button" class="btn_submit" id="btn-volver-login-2" style="margin-top:2rem;">Volver al inicio</button>
            </div>
        </div>
    </div>
`;

// ==================== ESTILOS ====================
(function() {
    if (document.getElementById('nav-extra-styles')) return;
    const s = document.createElement('style');
    s.id = 'nav-extra-styles';
    s.textContent = `
        .modal_mfa { max-width: 500px; max-height: 90vh; overflow-y: auto; }
        .modal_mfa_login { max-width: 380px; text-align: center; }
        .mfa_header { text-align: center; margin-bottom: 2rem; }
        .mfa_icon_wrap { font-size: 3rem; margin-bottom: 1rem; }
        .mfa_subtitulo { color: var(--gris); font-size: 1.4rem; margin-top: 0.5rem; line-height: 1.5; }
        .mfa_pasos { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2rem; }
        .mfa_paso { display: flex; gap: 1.4rem; align-items: flex-start; }
        .paso_numero { min-width: 3rem; height: 3rem; background: linear-gradient(135deg, var(--secundario), var(--secundarioOscuro)); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.4rem; flex-shrink: 0; }
        .paso_contenido h3 { font-size: 1.5rem; margin-bottom: 0.6rem; }
        .apps_lista { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .app_chip { background: var(--acentoClaro); color: var(--secundarioOscuro); padding: 0.3rem 1rem; border-radius: 20px; font-size: 1.2rem; }
        .qr_container { display: flex; justify-content: center; margin: 1rem 0; }
        .qr_loading { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; color: var(--gris); font-size: 1.3rem; }
        .spinner_mfa { width: 3rem; height: 3rem; border: 3px solid var(--acentoClaro); border-top-color: var(--secundario); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        #qr-code-div img, #qr-code-div canvas { border-radius: 8px; }
        .clave_manual_wrap { margin-top: 1rem; font-size: 1.3rem; }
        .clave_manual_wrap summary { cursor: pointer; color: var(--secundario); }
        .clave_manual { display: flex; align-items: center; gap: 1rem; margin-top: 0.8rem; background: var(--grisClaro); padding: 0.8rem 1rem; border-radius: 6px; }
        .clave_manual code { font-size: 1.2rem; letter-spacing: 0.1em; flex: 1; word-break: break-all; }
        .btn_copiar { background: var(--secundario); color: white; border: none; padding: 0.4rem 1rem; border-radius: 4px; cursor: pointer; font-size: 1.2rem; white-space: nowrap; }
        .btn_copiar:hover { background: var(--secundarioOscuro); }
        .codigo_totp_input { text-align: center !important; font-size: 2.4rem !important; letter-spacing: 0.4em; font-weight: bold; }
        .mfa_error { background: #fef2f2; border-left: 4px solid #ef4444; color: #dc2626; padding: 1rem 1.4rem; border-radius: 6px; font-size: 1.3rem; margin-top: 1rem; }
        .mfa_nota { text-align: center; font-size: 1.2rem; color: var(--gris); margin-top: 1.5rem; }
        .btn_link { display: block; width: 100%; text-align: center; background: none; border: none; color: var(--gris); cursor: pointer; font-size: 1.4rem; margin-top: 1rem; padding: 0.8rem; font-family: var(--fuenteTexto); }
        .btn_link:hover { color: var(--secundario); text-decoration: underline; }
        .form_extras { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .link_recuperar { font-size: 1.3rem; color: var(--secundario); text-decoration: none; }
        .link_recuperar:hover { text-decoration: underline; }
        .menu_usuario { position: absolute; top: 100%; right: 0; margin-top: 8px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 12px; min-width: 200px; display: none; z-index: 1000; }
        .menu_usuario.activo { display: block; }
        .menu_usuario_info { padding: 8px; margin-bottom: 8px; }
        .menu_usuario_info strong { display: block; margin-bottom: 4px; }
        .menu_usuario_info small { color: #666; font-size: 0.85rem; display: block; }
        .mfa_badge { color: #10b981 !important; margin-top: 4px; font-weight: 600; }
        .menu_usuario hr { border: none; border-top: 1px solid #e5e7eb; margin: 8px 0; }
        .menu_usuario_item { display: block; padding: 10px 12px; color: #374151; text-decoration: none; border-radius: 4px; transition: background 0.2s; }
        .menu_usuario_item:hover { background: #f3f4f6; }
        .navegacion_acciones { position: relative; }
    `;
    document.head.appendChild(s);
})();

// ==================== VARIABLES GLOBALES ====================
let _totpSecretSetup = null;      // Secreto durante el setup de MFA
let _totpSecretLogin = null;      // Secreto para verificar al hacer login
let _usuarioSesionPendiente = null; // Usuario en espera de verificar MFA

// ==================== HELPERS ====================

function abrirModal(id) {
    document.getElementById(id).classList.add('activo');
    document.body.style.overflow = 'hidden';
}
function cerrarModal(id) {
    document.getElementById(id).classList.remove('activo');
    document.body.style.overflow = '';
}
function cerrarTodos() {
    ['modal-auth','modal-mfa-setup','modal-mfa-login','modal-recuperar'].forEach(cerrarModal);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const n = document.createElement('div');
    n.className = `notificacion notificacion-${tipo}`;
    n.innerHTML = `<div class="notificacion_contenido">
        <span class="notificacion_icono">${tipo==='exito'?'✓':tipo==='error'?'✕':'ℹ'}</span>
        <span class="notificacion_mensaje">${mensaje}</span>
    </div>`;
    if (!document.getElementById('notif-styles')) {
        const s = document.createElement('style');
        s.id = 'notif-styles';
        s.textContent = `.notificacion{position:fixed;top:20px;right:20px;padding:16px 24px;border-radius:8px;background:white;box-shadow:0 4px 12px rgba(0,0,0,.15);z-index:10000;animation:slideIn .3s ease-out;max-width:400px}.notificacion_contenido{display:flex;align-items:center;gap:12px}.notificacion_icono{font-size:20px;font-weight:bold}.notificacion-exito{border-left:4px solid #10b981}.notificacion-exito .notificacion_icono{color:#10b981}.notificacion-error{border-left:4px solid #ef4444}.notificacion-error .notificacion_icono{color:#ef4444}.notificacion-info{border-left:4px solid #3b82f6}.notificacion-info .notificacion_icono{color:#3b82f6}@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(400px);opacity:0}}`;
        document.head.appendChild(s);
    }
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOut .3s ease-out';
        setTimeout(() => n.remove(), 300);
    }, 4000);
}

function soloNumeros(inputId) {
    const el = document.getElementById(inputId);
    if (el) el.addEventListener('input', function() { this.value = this.value.replace(/\D/g, ''); });
}

// ==================== NAVEGACIÓN ====================

const btnHamburguesa = document.querySelector('.btn_hamburguesa');
const navMenu = document.querySelector('.navegacion_menu');
btnHamburguesa.addEventListener('click', () => {
    btnHamburguesa.classList.toggle('activo');
    navMenu.classList.toggle('activo');
    document.body.classList.toggle('menu-abierto');
});

// Botón carrito → abrir drawer
document.querySelector(".btn_carrito")?.addEventListener("click", async () => {
    const { abrirCarrito } = await import("/includes/carritoDrawer.js");
    abrirCarrito();
});

// Tabs
document.querySelectorAll('.auth_tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.auth_tab').forEach(t => t.classList.remove('auth_tab-activo'));
        document.querySelectorAll('.auth_form').forEach(f => f.classList.remove('auth_form-activo'));
        tab.classList.add('auth_tab-activo');
        document.getElementById(`form-${tab.dataset.tab}`).classList.add('auth_form-activo');
    });
});

// Mostrar/ocultar contraseñas
document.querySelectorAll('.btn_ver_password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        input.type = input.type === 'password' ? 'text' : 'password';
        this.classList.toggle('activo');
    });
});

// Solo números en TOTP
soloNumeros('mfa-setup-codigo');
soloNumeros('mfa-login-codigo');

// Cerrar modales
document.getElementById('cerrar-modal-auth').addEventListener('click', () => cerrarModal('modal-auth'));
document.getElementById('modal-auth').addEventListener('click', e => { if (e.target.id === 'modal-auth') cerrarModal('modal-auth'); });
document.getElementById('cerrar-modal-recuperar').addEventListener('click', () => cerrarModal('modal-recuperar'));
document.getElementById('modal-recuperar').addEventListener('click', e => { if (e.target.id === 'modal-recuperar') cerrarModal('modal-recuperar'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarTodos(); });

// Botón cuenta
document.querySelector('.btn_usuario').addEventListener('click', async (e) => {
    e.stopPropagation();
    const { obtenerUsuarioActual } = await import('/includes/firebase.js');
    const user = obtenerUsuarioActual();
    if (!user) {
        abrirModal('modal-auth');
    } else {
        const m = document.getElementById('menu-usuario');
        if (m) m.classList.toggle('activo');
    }
});

// ==================== SETUP MFA ====================

async function iniciarSetupMfa() {
    cerrarTodos();
    
    // Resetear UI
    document.getElementById('qr-loading').style.display = 'flex';
    document.getElementById('qr-code-div').style.display = 'none';
    document.getElementById('qr-code-div').innerHTML = '';
    document.getElementById('totp-secret-display').textContent = '---';
    document.getElementById('mfa-setup-codigo').value = '';
    document.getElementById('mfa-setup-error').style.display = 'none';
    
    abrirModal('modal-mfa-setup');

    try {
        const { generarSecretoTotp, obtenerUsuarioActual } = await import('/includes/firebase.js');
        const user = obtenerUsuarioActual();
        const resultado = await generarSecretoTotp(user.email);

        if (!resultado.success) {
            document.getElementById('mfa-setup-error').textContent = resultado.error;
            document.getElementById('mfa-setup-error').style.display = 'block';
            return;
        }

        _totpSecretSetup = resultado.secretBase32;
        document.getElementById('totp-secret-display').textContent = resultado.secretBase32;

        // Cargar QRCode.js y generar QR
        await new Promise((res, rej) => {
            if (window.QRCode) { res(); return; }
            const sc = document.createElement('script');
            sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            sc.onload = res; sc.onerror = rej;
            document.head.appendChild(sc);
        });

        document.getElementById('qr-loading').style.display = 'none';
        document.getElementById('qr-code-div').style.display = 'flex';
        document.getElementById('qr-code-div').style.justifyContent = 'center';

        new QRCode(document.getElementById('qr-code-div'), {
            text: resultado.totpUri,
            width: 200,
            height: 200,
            colorDark: '#2c3e50',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });

    } catch (err) {
        console.error(err);
        document.getElementById('qr-loading').innerHTML = '<span style="color:#ef4444">Error al generar QR. Usa el código manual.</span>';
    }
}

// Copiar clave manual
document.getElementById('btn-copiar-clave').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('totp-secret-display').textContent).then(() => {
        const btn = document.getElementById('btn-copiar-clave');
        btn.textContent = '¡Copiado!';
        setTimeout(() => btn.textContent = 'Copiar', 2000);
    });
});

// Activar MFA
document.getElementById('btn-activar-mfa').addEventListener('click', async () => {
    const codigo = document.getElementById('mfa-setup-codigo').value.trim();
    const errorDiv = document.getElementById('mfa-setup-error');
    errorDiv.style.display = 'none';

    if (codigo.length !== 6) {
        errorDiv.textContent = 'Ingresa el código de 6 dígitos de tu app autenticadora.';
        errorDiv.style.display = 'block';
        return;
    }
    if (!_totpSecretSetup) {
        errorDiv.textContent = 'Error: recarga la página e intenta de nuevo.';
        errorDiv.style.display = 'block';
        return;
    }

    const btn = document.getElementById('btn-activar-mfa');
    btn.disabled = true;
    btn.textContent = 'Verificando...';

    try {
        const { verificarCodigoTotp, guardarMfaActivado, obtenerUsuarioActual } = await import('/includes/firebase.js');
        const user = obtenerUsuarioActual();
        const esValido = await verificarCodigoTotp(_totpSecretSetup, codigo);

        if (!esValido) {
            errorDiv.textContent = 'Código incorrecto. Verifica tu app autenticadora e intenta de nuevo.';
            errorDiv.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Activar verificación en dos pasos';
            return;
        }

        const resultado = await guardarMfaActivado(user.uid, _totpSecretSetup);
        if (resultado.success) {
            _totpSecretSetup = null;
            window._mfaEnProceso = false;
            cerrarModal('modal-mfa-setup');
            mostrarNotificacion('¡Verificación en dos pasos activada! Tu cuenta está protegida.', 'exito');
            actualizarMenuUsuario(user);
        } else {
            errorDiv.textContent = resultado.error;
            errorDiv.style.display = 'block';
        }
    } catch (err) {
        errorDiv.textContent = 'Error al activar. Intenta de nuevo.';
        errorDiv.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Activar verificación en dos pasos';
    }
});

// ==================== VERIFICAR MFA AL LOGIN ====================

function mostrarVerificacionMfaLogin(totpSecret, user) {
    _totpSecretLogin = totpSecret;
    _usuarioSesionPendiente = user;
    document.getElementById('mfa-login-codigo').value = '';
    document.getElementById('mfa-login-error').style.display = 'none';
    cerrarTodos();
    abrirModal('modal-mfa-login');
}

document.getElementById('btn-verificar-mfa-login').addEventListener('click', async () => {
    const codigo = document.getElementById('mfa-login-codigo').value.trim();
    const errorDiv = document.getElementById('mfa-login-error');
    errorDiv.style.display = 'none';

    if (codigo.length !== 6) {
        errorDiv.textContent = 'Ingresa el código de 6 dígitos.';
        errorDiv.style.display = 'block';
        return;
    }

    const btn = document.getElementById('btn-verificar-mfa-login');
    btn.disabled = true;
    btn.textContent = 'Verificando...';

    try {
        const { verificarCodigoTotp } = await import('/includes/firebase.js');
        const esValido = await verificarCodigoTotp(_totpSecretLogin, codigo);

        if (esValido) {
            window._mfaEnProceso = false;
            cerrarModal('modal-mfa-login');
            mostrarNotificacion('¡Bienvenido! Sesión iniciada correctamente', 'exito');
            actualizarMenuUsuario(_usuarioSesionPendiente);
            _totpSecretLogin = null;
            _usuarioSesionPendiente = null;
        } else {
            errorDiv.textContent = 'Código incorrecto. Intenta de nuevo.';
            errorDiv.style.display = 'block';
        }
    } catch (err) {
        errorDiv.textContent = 'Error al verificar. Intenta de nuevo.';
        errorDiv.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Verificar';
    }
});

document.getElementById('btn-cancelar-mfa-login').addEventListener('click', async () => {
    // Cerrar sesión si cancela la verificación
    const { cerrarSesion } = await import('/includes/firebase.js');
    await cerrarSesion();
    _totpSecretLogin = null;
    _usuarioSesionPendiente = null;
    cerrarModal('modal-mfa-login');
    abrirModal('modal-auth');
});

// ==================== FORMULARIO LOGIN ====================

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const recordar = document.getElementById('recordar').checked;

    const btn = e.target.querySelector('.btn_submit');
    btn.disabled = true;
    btn.textContent = 'Iniciando sesión...';

    try {
        const { iniciarSesion } = await import('/includes/firebase.js');
        const resultado = await iniciarSesion(email, password, recordar);

        if (resultado.success) {
            if (resultado.requiresMfaSetup) {
                window._mfaEnProceso = true;
                mostrarNotificacion('Por favor configura la verificación en dos pasos', 'info');
                await iniciarSetupMfa();
            } else if (resultado.requiresMfaVerify) {
                window._mfaEnProceso = true;
                mostrarVerificacionMfaLogin(resultado.totpSecret, resultado.user);
            } else {
                cerrarModal('modal-auth');
                mostrarNotificacion('¡Bienvenido!', 'exito');
                actualizarMenuUsuario(resultado.user);
            }
            e.target.reset();
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (err) {
        mostrarNotificacion('Error al iniciar sesión. Intenta nuevamente', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Iniciar Sesión';
    }
});

// ==================== FORMULARIO REGISTRO ====================

document.getElementById('form-registro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('registro-nombre').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const passwordConfirmar = document.getElementById('registro-password-confirmar').value;

    if (password !== passwordConfirmar) { mostrarNotificacion('Las contraseñas no coinciden', 'error'); return; }

    const btn = e.target.querySelector('.btn_submit');
    btn.disabled = true;
    btn.textContent = 'Creando cuenta...';

    try {
        const { registrarUsuario } = await import('/includes/firebase.js');
        const resultado = await registrarUsuario(email, password, nombre);

        if (resultado.success) {
            e.target.reset();
            mostrarNotificacion('¡Cuenta creada! Ahora configura la verificación en dos pasos', 'exito');
            await iniciarSetupMfa();
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (err) {
        mostrarNotificacion('Error al crear la cuenta. Intenta nuevamente', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Crear Cuenta';
    }
});

// ==================== GOOGLE ====================

async function manejarGoogle() {
    this.disabled = true;
    const original = this.innerHTML;
    this.innerHTML = '<span style="opacity:.6">Conectando...</span>';

    try {
        const { iniciarSesionConGoogle } = await import('/includes/firebase.js');
        const resultado = await iniciarSesionConGoogle();

        if (resultado.redirecting) return; // En producción redirige, no hay resultado aquí

        if (resultado.success) {
            if (resultado.requiresMfaSetup) {
                window._mfaEnProceso = true;
                mostrarNotificacion('¡Bienvenido! Configura la verificación en dos pasos', 'info');
                await iniciarSetupMfa();
            } else if (resultado.requiresMfaVerify) {
                window._mfaEnProceso = true;
                mostrarVerificacionMfaLogin(resultado.totpSecret, resultado.user);
            } else {
                cerrarModal('modal-auth');
                mostrarNotificacion('¡Conectado con Google!', 'exito');
                actualizarMenuUsuario(resultado.user);
            }
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (err) {
        mostrarNotificacion('Error al conectar con Google', 'error');
    } finally {
        this.disabled = false;
        this.innerHTML = original;
    }
}

document.getElementById('btn-google-login').addEventListener('click', manejarGoogle);
document.getElementById('btn-google-registro').addEventListener('click', manejarGoogle);

// ==================== RECUPERAR CONTRASEÑA ====================

document.getElementById('link-olvidar-password').addEventListener('click', (e) => {
    e.preventDefault();
    cerrarModal('modal-auth');
    document.getElementById('recuperar-step-1').style.display = 'block';
    document.getElementById('recuperar-step-2').style.display = 'none';
    document.getElementById('recuperar-email').value = '';
    document.getElementById('recuperar-error').style.display = 'none';
    abrirModal('modal-recuperar');
});

document.getElementById('btn-enviar-recuperacion').addEventListener('click', async () => {
    const email = document.getElementById('recuperar-email').value.trim();
    const errorDiv = document.getElementById('recuperar-error');
    errorDiv.style.display = 'none';

    if (!email) { errorDiv.textContent = 'Ingresa tu correo electrónico.'; errorDiv.style.display = 'block'; return; }

    const btn = document.getElementById('btn-enviar-recuperacion');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
        const { enviarEmailRecuperacion } = await import('/includes/firebase.js');
        const resultado = await enviarEmailRecuperacion(email);
        if (resultado.success) {
            document.getElementById('recuperar-step-1').style.display = 'none';
            document.getElementById('recuperar-step-2').style.display = 'block';
        } else {
            errorDiv.textContent = resultado.error;
            errorDiv.style.display = 'block';
        }
    } catch (err) {
        errorDiv.textContent = 'Error al enviar el correo.';
        errorDiv.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Enviar correo';
    }
});

document.getElementById('btn-volver-login').addEventListener('click', () => { cerrarModal('modal-recuperar'); abrirModal('modal-auth'); });
document.getElementById('btn-volver-login-2').addEventListener('click', () => { cerrarModal('modal-recuperar'); abrirModal('modal-auth'); });

// ==================== MANEJO REDIRECT GOOGLE (producción) ====================

(async function() {
    const esLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (esLocal) return; // En local se usa popup, no hay redirect que manejar

    try {
        const { manejarRedirectGoogle } = await import('/includes/firebase.js');
        const resultado = await manejarRedirectGoogle();
        if (!resultado) return;

        if (resultado.success) {
            if (resultado.requiresMfaSetup) {
                window._mfaEnProceso = true;
                mostrarNotificacion('¡Bienvenido! Configura la verificación en dos pasos', 'info');
                await iniciarSetupMfa();
            } else if (resultado.requiresMfaVerify) {
                window._mfaEnProceso = true;
                mostrarVerificacionMfaLogin(resultado.totpSecret, resultado.user);
            } else {
                mostrarNotificacion('¡Conectado con Google!', 'exito');
                actualizarMenuUsuario(resultado.user);
            }
        } else {
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (err) {
        // Sin redirect pendiente, ignorar
    }
})();

// ==================== OBSERVADOR AUTH ====================

(async function() {
    const { observarEstadoAutenticacion, obtenerDatosUsuario, cerrarSesion } = await import('/includes/firebase.js');

    // Bandera para evitar que el observador interrumpa un flujo de login/MFA activo
    // (cuando el usuario acaba de hacer login y está en el modal de MFA setup/verify)
    window._mfaEnProceso = false;

    observarEstadoAutenticacion(async (user) => {
        const btnTexto = document.querySelector('.btn_usuario .btn_texto');

        if (user) {
            // Si hay un flujo de MFA activo (setup o verificación), no interrumpir
            if (window._mfaEnProceso) return;

            // Verificar estado MFA en Firestore
            const { success, data } = await obtenerDatosUsuario(user.uid);

            if (!success) {
                // Error real leyendo Firestore (ej: sin conexión, reglas denegadas) — cerrar sesión por seguridad
                await cerrarSesion();
                return;
            }

            // Si data es null significa que el documento aún no existe (usuario nuevo)
            // En ese caso también hay que configurar MFA
            if (!data || !data.mfaConfigurado) {
                // No tiene MFA configurado → obligar setup
                window._mfaEnProceso = true;
                if (btnTexto) btnTexto.textContent = 'Cuenta';
                mostrarNotificacion('Debes configurar la verificación en dos pasos para continuar', 'info');
                await iniciarSetupMfa();
                return;
            }

            // MFA configurado y sesión válida → mostrar menú
            if (btnTexto) btnTexto.textContent = user.displayName || user.email.split('@')[0];
            actualizarMenuUsuario(user);

        } else {
            if (btnTexto) btnTexto.textContent = 'Cuenta';
            const m = document.getElementById('menu-usuario');
            if (m) m.remove();
        }
    });
})();

// ==================== MENÚ USUARIO ====================

function actualizarMenuUsuario(user) {
    if (!user) return;
    const btnUsuario = document.querySelector('.btn_usuario');
    let menu = document.getElementById('menu-usuario');
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'menu-usuario';
        menu.className = 'menu_usuario';
        menu.innerHTML = `
            <div class="menu_usuario_info">
                <strong>${user.displayName || 'Usuario'}</strong>
                <small>${user.email}</small>
            </div>
            <hr>
            <a href="/pages/cuenta.html" class="menu_usuario_item">Mi cuenta</a>
            <a href="/pages/cuenta.html#pedidos" class="menu_usuario_item" id="ir-pedidos">Mis pedidos</a>
            <a href="#" class="menu_usuario_item" id="btn-cerrar-sesion">Cerrar sesión</a>
        `;
        btnUsuario.parentElement.appendChild(menu);

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !btnUsuario.contains(e.target)) menu.classList.remove('activo');
        });

        document.getElementById('btn-cerrar-sesion').addEventListener('click', async (e) => {
            e.preventDefault();
            const { cerrarSesion } = await import('/includes/firebase.js');
            const r = await cerrarSesion();
            if (r.success) { mostrarNotificacion('Sesión cerrada correctamente', 'exito'); menu.remove(); }
        });
    }
}