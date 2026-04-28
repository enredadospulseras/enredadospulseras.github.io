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
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    sendPasswordResetEmail,
    sendEmailVerification,
    confirmPasswordReset,
    verifyPasswordResetCode
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAQROFdgG07yPocuES6XdMRQU2f_JIhMpQ",
    authDomain: "enredados-5586b.firebaseapp.com",
    projectId: "enredados-5586b",
    storageBucket: "enredados-5586b.firebasestorage.app",
    messagingSenderId: "638938736750",
    appId: "1:638938736750:web:0072bb3dec709b66231e7f",
    measurementId: "G-6PVFWFZ5YM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// ==================== TOTP MANUAL (sin Firebase MFA) ====================

function cargarOTPAuth() {
    return new Promise((resolve, reject) => {
        if (window.OTPAuth) { resolve(window.OTPAuth); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/otpauth/9.3.6/otpauth.umd.min.js';
        script.onload = () => resolve(window.OTPAuth);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export async function generarSecretoTotp(email) {
    try {
        const OTPAuth = await cargarOTPAuth();
        const secret = new OTPAuth.Secret({ size: 20 });
        const secretBase32 = secret.base32;
        const totp = new OTPAuth.TOTP({
            issuer: 'Enredados',
            label: email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secretBase32)  // ← Corrección: decodificar base32
        });
        const totpUri = totp.toString();
        return { success: true, secretBase32, totpUri };
    } catch (error) {
        console.error('Error al generar secreto TOTP:', error);
        return { success: false, error: 'Error al generar el código QR.' };
    }
}

export async function verificarCodigoTotp(secretBase32, codigo) {
    try {
        const OTPAuth = await cargarOTPAuth();
        const totp = new OTPAuth.TOTP({
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secretBase32)  // ← Corrección: decodificar base32
        });
        const delta = totp.validate({ token: codigo.trim(), window: 1 });
        return delta !== null;
    } catch (error) {
        console.error('Error al verificar TOTP:', error);
        return false;
    }
}

export async function guardarMfaActivado(uid, secretBase32) {
    try {
        await setDoc(doc(db, 'usuarios', uid), {
            mfaConfigurado: true,
            totpSecret: secretBase32
        }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error('Error al guardar MFA:', error);
        return { success: false, error: 'Error al guardar la configuración.' };
    }
}

export async function obtenerDatosUsuario(uid) {
    try {
        const snap = await getDoc(doc(db, 'usuarios', uid));
        if (snap.exists()) return { success: true, data: snap.data() };
        return { success: true, data: null };
    } catch (error) {
        return { success: false, data: null };
    }
}

// ==================== AUTENTICACIÓN ====================

export async function registrarUsuario(email, password, nombre) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: nombre });
        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre,
            email,
            mfaConfigurado: false,
            creadoEn: new Date()
        });
        let emailEnviado = true;
        try { await sendEmailVerification(user); } catch (e) { emailEnviado = false; }
        return { success: true, user, requiresEmailVerification: true, emailEnviado };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export async function iniciarSesion(email, password, recordar = false) {
    try {
        const persistence = recordar ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (!user.emailVerified) {
            await signOut(auth);
            return { success: false, error: 'Debes verificar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.' };
        }
        const snap = await getDoc(doc(db, 'usuarios', user.uid));
        const datos = snap.exists() ? snap.data() : {};
        if (datos.mfaConfigurado) {
            return { success: true, user, requiresMfaVerify: true, totpSecret: datos.totpSecret };
        }
        return { success: true, user };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export async function iniciarSesionConGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return await procesarUsuarioGoogle(result.user);
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

async function procesarUsuarioGoogle(user) {
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    if (!snap.exists()) {
        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre: user.displayName,
            email: user.email,
            mfaConfigurado: false,
            creadoEn: new Date()
        });
        return { success: true, user };
    }
    const datos = snap.data();
    if (datos.mfaConfigurado) {
        return { success: true, user, requiresMfaVerify: true, totpSecret: datos.totpSecret };
    }
    return { success: true, user };
}

export async function cerrarSesion() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export async function recargarUsuario() {
    const user = auth.currentUser;
    if (!user) return null;
    await user.reload();
    return auth.currentUser;
}

export async function reenviarVerificacion() {
    try {
        const user = auth.currentUser;
        if (!user) return { success: false, error: 'No hay sesión activa.' };
        await sendEmailVerification(user);
        return { success: true };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export async function desactivarMfa(uid) {
    try {
        await setDoc(doc(db, 'usuarios', uid), { mfaConfigurado: false, totpSecret: null }, { merge: true });
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error al desactivar la verificación.' };
    }
}

// ==================== RECUPERACIÓN DE CONTRASEÑA ====================

export async function enviarEmailRecuperacion(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export async function verificarCodigoReset(oobCode) {
    try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        return { success: true, email };
    } catch (error) {
        return { success: false, error: 'El enlace de recuperación es inválido o ha expirado.' };
    }
}

export async function confirmarNuevaContrasena(oobCode, nuevaContrasena) {
    try {
        await confirmPasswordReset(auth, oobCode, nuevaContrasena);
        return { success: true };
    } catch (error) {
        return { success: false, error: obtenerMensajeError(error.code) };
    }
}

export function observarEstadoAutenticacion(callback) {
    return onAuthStateChanged(auth, callback);
}

export function obtenerUsuarioActual() {
    return auth.currentUser;
}

function obtenerMensajeError(codigoError) {
    const mensajes = {
        'auth/email-already-in-use': 'Este correo electrónico ya está registrado',
        'auth/invalid-email': 'El correo electrónico no es válido',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
        'auth/user-not-found': 'No existe una cuenta con este correo electrónico',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/invalid-credential': 'Credenciales inválidas. Verifica tu email y contraseña',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
        'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
        'auth/popup-closed-by-user': 'Cerraste la ventana de autenticación',
        'auth/popup-blocked': 'El navegador bloqueó la ventana emergente',
        'auth/expired-action-code': 'El enlace ha expirado. Solicita uno nuevo.',
        'auth/invalid-action-code': 'El enlace es inválido o ya fue usado.'
    };
    return mensajes[codigoError] || 'Ha ocurrido un error. Intenta nuevamente';
}

export { auth, db };