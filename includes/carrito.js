// ==================== MÓDULO DE CARRITO ====================
// Gestiona el carrito con localStorage (invitados) y Firestore (usuarios)

import { auth, db } from '/includes/firebase.js';
import { doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// ---- Estado ----
let carrito = [];
let uid = null;

// ---- Persistencia ----
function guardarLocal() {
    localStorage.setItem('carrito_guest', JSON.stringify(carrito));
    emitirCambio();
}

async function guardarFirestore() {
    if (!uid) return;
    await setDoc(doc(db, 'carritos', uid), { items: carrito, updatedAt: new Date() }, { merge: true });
    emitirCambio();
}

async function cargarFirestore() {
    if (!uid) return;
    const snap = await getDoc(doc(db, 'carritos', uid));
    if (snap.exists()) carrito = snap.data().items || [];
    emitirCambio();
}

function cargarLocal() {
    const data = localStorage.getItem('carrito_guest');
    carrito = data ? JSON.parse(data) : [];
    emitirCambio();
}

function emitirCambio() {
    document.dispatchEvent(new CustomEvent('carritoActualizado', { detail: { items: carrito } }));
}

// ---- Sincronizar carrito guest → Firestore al hacer login ----
async function sincronizarGuestConFirestore() {
    const local = localStorage.getItem('carrito_guest');
    if (!local) return;
    const guestItems = JSON.parse(local);
    if (!guestItems.length) return;

    const snap = await getDoc(doc(db, 'carritos', uid));
    const fsItems = snap.exists() ? (snap.data().items || []) : [];

    // Merge: sumar cantidades de items iguales
    guestItems.forEach(gi => {
        const idx = fsItems.findIndex(fi => fi.id === gi.id && JSON.stringify(fi.opciones) === JSON.stringify(gi.opciones));
        if (idx >= 0) fsItems[idx].cantidad += gi.cantidad;
        else fsItems.push(gi);
    });

    carrito = fsItems;
    localStorage.removeItem('carrito_guest');
    await guardarFirestore();
}

// ---- API pública ----
export async function agregarItem(item) {
    // item: { id, nombre, precio, imagen, cantidad, opciones? }
    const key = JSON.stringify(item.opciones || {});
    const idx = carrito.findIndex(ci => ci.id === item.id && JSON.stringify(ci.opciones || {}) === key);
    if (idx >= 0) {
        carrito[idx].cantidad += item.cantidad || 1;
    } else {
        carrito.push({ ...item, cantidad: item.cantidad || 1 });
    }
    uid ? await guardarFirestore() : guardarLocal();
}

export async function eliminarItem(id, opciones = {}) {
    carrito = carrito.filter(ci => !(ci.id === id && JSON.stringify(ci.opciones || {}) === JSON.stringify(opciones)));
    uid ? await guardarFirestore() : guardarLocal();
}

export async function actualizarCantidad(id, opciones = {}, cantidad) {
    const key = JSON.stringify(opciones);
    const idx = carrito.findIndex(ci => ci.id === id && JSON.stringify(ci.opciones || {}) === key);
    if (idx >= 0) {
        if (cantidad <= 0) await eliminarItem(id, opciones);
        else { carrito[idx].cantidad = cantidad; uid ? await guardarFirestore() : guardarLocal(); }
    }
}

export async function vaciarCarrito() {
    carrito = [];
    uid ? await guardarFirestore() : guardarLocal();
}

export function obtenerCarrito() { return [...carrito]; }

export function obtenerTotal() {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

export function obtenerCantidadTotal() {
    return carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

// ---- Inicialización: escuchar auth ----
onAuthStateChanged(auth, async (user) => {
    uid = user ? user.uid : null;
    if (user) {
        await sincronizarGuestConFirestore();
        await cargarFirestore();
    } else {
        cargarLocal();
    }
});

// Carga inicial
cargarLocal();
