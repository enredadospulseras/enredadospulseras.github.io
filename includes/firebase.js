// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQROFdgG07yPocuES6XdMRQU2f_JIhMpQ",
    authDomain: "enredados-5586b.firebaseapp.com",
    projectId: "enredados-5586b",
    storageBucket: "enredados-5586b.firebasestorage.app",
    messagingSenderId: "638938736750",
    appId: "1:638938736750:web:0072bb3dec709b66231e7f",
    measurementId: "G-6PVFWFZ5YM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Configurar proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// ==================== FUNCIONES DE AUTENTICACIÓN ====================

// Registrar usuario con email y contraseña
export async function registrarUsuario(email, password, nombre) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Actualizar el perfil con el nombre
        await updateProfile(user, {
            displayName: nombre
        });
        
        console.log("Usuario registrado exitosamente:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Iniciar sesión con email y contraseña
export async function iniciarSesion(email, password, recordar = false) {
    try {
        // Configurar persistencia según la opción "recordar"
        const persistence = recordar ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence);
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("Sesión iniciada exitosamente:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Cerrar sesión
export async function cerrarSesion() {
    try {
        await signOut(auth);
        console.log("Sesión cerrada exitosamente");
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Iniciar sesión con Google
export async function iniciarSesionConGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        console.log("Sesión iniciada con Google:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Iniciar sesión con Facebook
export async function iniciarSesionConFacebook() {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        
        console.log("Sesión iniciada con Facebook:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error al iniciar sesión con Facebook:", error);
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

// Observador de estado de autenticación
export function observarEstadoAutenticacion(callback) {
    return onAuthStateChanged(auth, callback);
}

// Obtener usuario actual
export function obtenerUsuarioActual() {
    return auth.currentUser;
}

// ==================== FUNCIONES AUXILIARES ====================

// Traducir códigos de error de Firebase a mensajes en español
function obtenerMensajeError(codigoError) {
    const mensajes = {
        'auth/email-already-in-use': 'Este correo electrónico ya está registrado',
        'auth/invalid-email': 'El correo electrónico no es válido',
        'auth/operation-not-allowed': 'Operación no permitida',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
        'auth/user-not-found': 'No existe una cuenta con este correo electrónico',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/invalid-credential': 'Credenciales inválidas',
        'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
        'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
        'auth/popup-closed-by-user': 'Has cerrado la ventana de autenticación',
        'auth/cancelled-popup-request': 'Operación cancelada',
        'auth/popup-blocked': 'El navegador bloqueó la ventana emergente'
    };
    
    return mensajes[codigoError] || 'Ha ocurrido un error. Intenta nuevamente';
}

// Exportar auth para uso externo si es necesario
export { auth };