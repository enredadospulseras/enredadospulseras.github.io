// ==================== NAVEGACIÓN ====================
document.getElementById("nav-placeholder").innerHTML = `
    <nav class="navegacion">
        <a href="index.html" class="logo-link">
            <img class="header_logo" src="/static/img/logos/logo_completo.png" alt="Logotipo Enredados">
        </a>

        <!-- Botón hamburguesa para móvil -->
        <button class="btn_hamburguesa" aria-label="Menú">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <!-- Menú de navegación -->
        <div class="navegacion_menu">
            <div class="navegacion_enlaces">
                <a class="navegacion_enlace navegacion_enlace-activo" href="/index.html">Tienda</a>
                <a class="navegacion_enlace" href="/pages/nosotros.html">Nosotros</a>
                <a class="navegacion_enlace" href="#contacto">Contacto</a>
            </div>

            <div class="navegacion_acciones">
                <button class="btn_usuario" aria-label="Usuario">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="usuario_icono">
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                    </svg>
                    <span class="btn_texto">Cuenta</span>
                </button>
                <button class="btn_carrito" aria-label="Carrito de compras">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="carrito_icono">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span class="carrito_cantidad">0</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Modal de autenticación -->
    <div class="modal_overlay" id="modal-auth">
        <div class="modal_contenido">
            <button class="modal_cerrar" aria-label="Cerrar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>

            <!-- Tabs para cambiar entre Login y Registro -->
            <div class="auth_tabs">
                <button class="auth_tab auth_tab-activo" data-tab="login">Iniciar Sesión</button>
                <button class="auth_tab" data-tab="registro">Registrarse</button>
            </div>

            <!-- Formulario de Login -->
            <form class="auth_form auth_form-activo" id="form-login">
                <h2 class="auth_titulo">Bienvenido de nuevo</h2>
                
                <div class="form_grupo">
                    <label for="login-email" class="form_label">Correo electrónico</label>
                    <input 
                        type="email" 
                        id="login-email" 
                        class="form_input" 
                        placeholder="tu@email.com"
                        required
                    >
                </div>

                <div class="form_grupo">
                    <label for="login-password" class="form_label">Contraseña</label>
                    <div class="input_password">
                        <input 
                            type="password" 
                            id="login-password" 
                            class="form_input" 
                            placeholder="••••••••"
                            required
                        >
                        <button type="button" class="btn_ver_password" aria-label="Mostrar contraseña">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="form_extras">
                    <label class="checkbox_label">
                        <input type="checkbox" id="recordar">
                        <span>Recordarme</span>
                    </label>
                    <!-- <a href="#" class="link_recuperar">¿Olvidaste tu contraseña?</a> -->
                </div>

                <button type="submit" class="btn_submit">Iniciar Sesión</button>

                <div class="auth_divider">
                    <span>o continúa con</span>
                </div>

                <div class="auth_redes">
                    <button type="button" class="btn_red btn_red-google">
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

            <!-- Formulario de Registro -->
            <form class="auth_form" id="form-registro">
                <h2 class="auth_titulo">Crear cuenta nueva</h2>
                
                <div class="form_grupo">
                    <label for="registro-nombre" class="form_label">Nombre completo</label>
                    <input 
                        type="text" 
                        id="registro-nombre" 
                        class="form_input" 
                        placeholder="Tú Nombre"
                        required
                    >
                </div>

                <div class="form_grupo">
                    <label for="registro-email" class="form_label">Correo electrónico</label>
                    <input 
                        type="email" 
                        id="registro-email" 
                        class="form_input" 
                        placeholder="tu@email.com"
                        required
                    >
                </div>

                <div class="form_grupo">
                    <label for="registro-password" class="form_label">Contraseña</label>
                    <div class="input_password">
                        <input 
                            type="password" 
                            id="registro-password" 
                            class="form_input" 
                            placeholder="Mínimo 8 caracteres"
                            required
                            minlength="8"
                        >
                        <button type="button" class="btn_ver_password" aria-label="Mostrar contraseña">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                    <small class="form_ayuda">Debe tener al menos 8 caracteres</small>
                </div>

                <div class="form_grupo">
                    <label for="registro-password-confirmar" class="form_label">Confirmar contraseña</label>
                    <div class="input_password">
                        <input 
                            type="password" 
                            id="registro-password-confirmar" 
                            class="form_input" 
                            placeholder="Repite tu contraseña"
                            required
                            minlength="8"
                        >
                        <button type="button" class="btn_ver_password" aria-label="Mostrar contraseña">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <label class="checkbox_label">
                    <input type="checkbox" id="terminos" required>
                    <span>Acepto los <a href="#">términos y condiciones</a></span>
                </label>

                <button type="submit" class="btn_submit">Crear Cuenta</button>

                <div class="auth_divider">
                    <span>o continúa con</span>
                </div>

                <div class="auth_redes">
                    <button type="button" class="btn_red btn_red-google">
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
`;

// ==================== FUNCIONALIDAD ====================

// Menú hamburguesa
const btnHamburguesa = document.querySelector('.btn_hamburguesa');
const navMenu = document.querySelector('.navegacion_menu');

btnHamburguesa.addEventListener('click', () => {
    btnHamburguesa.classList.toggle('activo');
    navMenu.classList.toggle('activo');
    document.body.classList.toggle('menu-abierto');
});

// Cerrar menú al hacer click en un enlace (móvil)
document.querySelectorAll('.navegacion_enlace').forEach(enlace => {
    enlace.addEventListener('click', () => {
        btnHamburguesa.classList.remove('activo');
        navMenu.classList.remove('activo');
        document.body.classList.remove('menu-abierto');
    });
});

// Modal de autenticación
const btnUsuario = document.querySelector('.btn_usuario');
const modalAuth = document.getElementById('modal-auth');
const btnCerrarModal = document.querySelector('.modal_cerrar');
const overlay = modalAuth;

// Abrir modal (solo si no hay sesión iniciada)
btnUsuario.addEventListener('click', async (e) => {
    e.stopPropagation();
    
    try {
        const { obtenerUsuarioActual } = await import('/includes/firebase.js');
        const user = obtenerUsuarioActual();
        
        if (!user) {
            // Si NO hay usuario, abrir modal de login
            modalAuth.classList.add('activo');
            document.body.style.overflow = 'hidden';
        } else {
            // Si hay usuario, toggle del menú desplegable
            const menuUsuario = document.getElementById('menu-usuario');
            if (menuUsuario) {
                menuUsuario.classList.toggle('activo');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        // Si hay error, abrir modal por defecto
        modalAuth.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }
});

// Cerrar modal
btnCerrarModal.addEventListener('click', cerrarModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        cerrarModal();
    }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalAuth.classList.contains('activo')) {
        cerrarModal();
    }
});

function cerrarModal() {
    modalAuth.classList.remove('activo');
    document.body.style.overflow = '';
}

// Cambiar entre tabs (Login/Registro)
const authTabs = document.querySelectorAll('.auth_tab');
const authForms = document.querySelectorAll('.auth_form');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Actualizar tabs activos
        authTabs.forEach(t => t.classList.remove('auth_tab-activo'));
        tab.classList.add('auth_tab-activo');
        
        // Mostrar formulario correspondiente
        authForms.forEach(form => {
            if (form.id === `form-${tabName}`) {
                form.classList.add('auth_form-activo');
            } else {
                form.classList.remove('auth_form-activo');
            }
        });
    });
});

// Mostrar/ocultar contraseña
document.querySelectorAll('.btn_ver_password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        
        // Cambiar icono
        this.classList.toggle('activo');
    });
});

// Manejo del formulario de login
document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const recordar = document.getElementById('recordar').checked;
    
    // Deshabilitar el botón de envío
    const btnSubmit = e.target.querySelector('.btn_submit');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Iniciando sesión...';
    
    try {
        // Importar la función de Firebase
        const { iniciarSesion } = await import('/includes/firebase.js');
        
        // Intentar iniciar sesión
        const resultado = await iniciarSesion(email, password, recordar);
        
        if (resultado.success) {
            // Mostrar mensaje de éxito
            mostrarNotificacion('¡Bienvenido! Sesión iniciada correctamente', 'exito');
            cerrarModal();
            // Limpiar formulario
            e.target.reset();
        } else {
            // Mostrar error
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error al iniciar sesión. Intenta nuevamente', 'error');
    } finally {
        // Rehabilitar el botón
        btnSubmit.disabled = false;
        btnSubmit.textContent = textoOriginal;
    }
});

// Manejo del formulario de registro
document.getElementById('form-registro').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('registro-nombre').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const passwordConfirmar = document.getElementById('registro-password-confirmar').value;
    const terminos = document.getElementById('terminos').checked;
    
    // Validar que las contraseñas coincidan
    if (password !== passwordConfirmar) {
        mostrarNotificacion('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (!terminos) {
        mostrarNotificacion('Debes aceptar los términos y condiciones', 'error');
        return;
    }
    
    // Deshabilitar el botón de envío
    const btnSubmit = e.target.querySelector('.btn_submit');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Creando cuenta...';
    
    try {
        // Importar la función de Firebase
        const { registrarUsuario } = await import('/includes/firebase.js');
        
        // Intentar registrar usuario
        const resultado = await registrarUsuario(email, password, nombre);
        
        if (resultado.success) {
            // Mostrar mensaje de éxito
            mostrarNotificacion('¡Cuenta creada exitosamente! Bienvenido', 'exito');
            cerrarModal();
            // Limpiar formulario
            e.target.reset();
        } else {
            // Mostrar error
            mostrarNotificacion(resultado.error, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error al crear la cuenta. Intenta nuevamente', 'error');
    } finally {
        // Rehabilitar el botón
        btnSubmit.disabled = false;
        btnSubmit.textContent = textoOriginal;
    }
});

// Botones de redes sociales
document.querySelectorAll('.btn_red').forEach(btn => {
    btn.addEventListener('click', async function() {
        const red = this.textContent.trim();
        
        // Deshabilitar botón durante la autenticación
        btn.disabled = true;
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = `<span style="opacity: 0.6;">Conectando...</span>`;
        
        try {
            let resultado;
            
            if (red === 'Google') {
                const { iniciarSesionConGoogle } = await import('/includes/firebase.js');
                resultado = await iniciarSesionConGoogle();
            }
            
            if (resultado && resultado.success) {
                mostrarNotificacion(`¡Bienvenido! Conectado con ${red}`, 'exito');
                cerrarModal();
            } else if (resultado) {
                mostrarNotificacion(resultado.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarNotificacion(`Error al conectar con ${red}`, 'error');
        } finally {
            // Rehabilitar botón
            btn.disabled = false;
            btn.innerHTML = textoOriginal;
        }
    });
});

// ==================== SISTEMA DE NOTIFICACIONES ====================

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <div class="notificacion_contenido">
            <span class="notificacion_icono">
                ${tipo === 'exito' ? '✓' : tipo === 'error' ? '✕' : 'ℹ'}
            </span>
            <span class="notificacion_mensaje">${mensaje}</span>
        </div>
    `;
    
    // Añadir estilos si no existen
    if (!document.getElementById('notificacion-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notificacion-styles';
        styles.textContent = `
            .notificacion {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 8px;
                background: white;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }
            
            .notificacion_contenido {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notificacion_icono {
                font-size: 20px;
                font-weight: bold;
            }
            
            .notificacion-exito {
                border-left: 4px solid #10b981;
            }
            
            .notificacion-exito .notificacion_icono {
                color: #10b981;
            }
            
            .notificacion-error {
                border-left: 4px solid #ef4444;
            }
            
            .notificacion-error .notificacion_icono {
                color: #ef4444;
            }
            
            .notificacion-info {
                border-left: 4px solid #3b82f6;
            }
            
            .notificacion-info .notificacion_icono {
                color: #3b82f6;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Añadir al DOM
    document.body.appendChild(notificacion);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 4000);
}

// ==================== OBSERVADOR DE ESTADO DE AUTENTICACIÓN ====================

// Importar y configurar el observador al cargar la página
(async function() {
    try {
        const { observarEstadoAutenticacion } = await import('/includes/firebase.js');
        
        observarEstadoAutenticacion((user) => {
            const btnUsuario = document.querySelector('.btn_usuario');
            const btnTexto = btnUsuario.querySelector('.btn_texto');
            
            if (user) {
                // Usuario autenticado
                console.log('Usuario autenticado:', user);
                
                // Cambiar texto del botón
                if (btnTexto) {
                    btnTexto.textContent = user.displayName || user.email.split('@')[0];
                }
                
                // Añadir menú desplegable de usuario (opcional)
                actualizarMenuUsuario(user);
            } else {
                // Usuario no autenticado
                console.log('Usuario no autenticado');
                
                if (btnTexto) {
                    btnTexto.textContent = 'Cuenta';
                }
            }
        });
    } catch (error) {
        console.error('Error al configurar observador de autenticación:', error);
    }
})();

// Función para actualizar el menú de usuario
function actualizarMenuUsuario(user) {
    const btnUsuario = document.querySelector('.btn_usuario');
    
    // Crear menú desplegable si no existe
    let menuUsuario = document.getElementById('menu-usuario');
    if (!menuUsuario) {
        menuUsuario = document.createElement('div');
        menuUsuario.id = 'menu-usuario';
        menuUsuario.className = 'menu_usuario';
        menuUsuario.innerHTML = `
            <div class="menu_usuario_info">
                <strong>${user.displayName || 'Usuario'}</strong>
                <small>${user.email}</small>
            </div>
            <hr>
            <a href="#" class="menu_usuario_item">Mi cuenta</a>
            <a href="#" class="menu_usuario_item">Mis pedidos</a>
            <a href="#" class="menu_usuario_item" id="btn-cerrar-sesion">Cerrar sesión</a>
        `;
        
        // Añadir estilos del menú
        if (!document.getElementById('menu-usuario-styles')) {
            const styles = document.createElement('style');
            styles.id = 'menu-usuario-styles';
            styles.textContent = `
                .menu_usuario {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 8px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 12px;
                    min-width: 200px;
                    display: none;
                    z-index: 1000;
                }
                
                .menu_usuario.activo {
                    display: block;
                }
                
                .menu_usuario_info {
                    padding: 8px;
                    margin-bottom: 8px;
                }
                
                .menu_usuario_info strong {
                    display: block;
                    margin-bottom: 4px;
                }
                
                .menu_usuario_info small {
                    color: #666;
                    font-size: 0.85rem;
                }
                
                .menu_usuario hr {
                    border: none;
                    border-top: 1px solid #e5e7eb;
                    margin: 8px 0;
                }
                
                .menu_usuario_item {
                    display: block;
                    padding: 10px 12px;
                    color: #374151;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background 0.2s;
                }
                
                .menu_usuario_item:hover {
                    background: #f3f4f6;
                }
                
                .navegacion_acciones {
                    position: relative;
                }
            `;
            document.head.appendChild(styles);
        }
        
        btnUsuario.parentElement.appendChild(menuUsuario);
        
        // Marcar que el menú está inicializado
        btnUsuario.dataset.menuInicializado = 'true';
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!menuUsuario.contains(e.target) && !btnUsuario.contains(e.target)) {
                menuUsuario.classList.remove('activo');
            }
        });
        
        // Cerrar sesión
        document.getElementById('btn-cerrar-sesion').addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                const { cerrarSesion } = await import('/includes/firebase.js');
                const resultado = await cerrarSesion();
                
                if (resultado.success) {
                    mostrarNotificacion('Sesión cerrada correctamente', 'exito');
                    menuUsuario.remove();
                }
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                mostrarNotificacion('Error al cerrar sesión', 'error');
            }
        });
    }
}