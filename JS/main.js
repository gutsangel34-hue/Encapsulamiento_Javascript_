"use strict";
// =====================================================================
//  main.js  ·  Conecta las clases con la página (HTML)
// =====================================================================

const formato = n => "$" + n.toLocaleString("es-CO");

// Objetos reales fabricados con los "moldes" (clases)
const miAlcancia = new Alcancia();
const insegura = new AlcanciaInsegura();

// Elementos de la página
const saldoEl = document.getElementById("saldo");
const cantidadEl = document.getElementById("cantidad");
const mensajeEl = document.getElementById("mensaje");
const historialEl = document.getElementById("historial");
const saldoInseguraEl = document.getElementById("saldoInsegura");

function mostrar(texto, tipo) {
  mensajeEl.textContent = texto;
  mensajeEl.className = tipo;
}

function actualizar() {
  saldoEl.textContent = formato(miAlcancia.saldo);
  saldoInseguraEl.textContent = formato(insegura.dinero);

  historialEl.replaceChildren();
  const movimientos = miAlcancia.historial;
  if (movimientos.length === 0) {
    const vacio = document.createElement("li");
    vacio.textContent = "Sin movimientos todavía.";
    historialEl.append(vacio);
  }
  movimientos.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.tipo}: ${formato(m.cantidad)} → saldo ${formato(m.saldo)}`;
    historialEl.append(li);
  });
}

function intentar(accion, textoOk) {
  try {
    accion(Number(cantidadEl.value));
    mostrar(textoOk, "ok");
  } catch (e) {
    mostrar("✖ " + e.message, "error");
  }
  actualizar();
}

// ---------- Botones permitidos (la interfaz pública) ----------
document.getElementById("btnGuardar").addEventListener("click", () =>
  intentar(c => miAlcancia.guardar(c), "☑ Guardado."));
document.getElementById("btnSacar").addEventListener("click", () =>
  intentar(c => miAlcancia.sacar(c), "☑ Retiro hecho."));

// ---------- La trampa CON encapsulamiento ----------
document.getElementById("btnTrampa").addEventListener("click", () => {
  const informe = [];

  // Intento 1: escribir en el getter (no tiene setter).
  try {
    miAlcancia.saldo = 1000000;
    informe.push("saldo = 1000000 → pasó (no debería).");
  } catch (e) {
    informe.push("1) miAlcancia.saldo = 1000000 → " + e.name + ": el getter es de solo lectura.");
  }

  // Intento 2: crear una propiedad suelta llamada "dinero".
  miAlcancia.dinero = 1000000;   // NO toca #dinero: solo crea una propiedad nueva
  informe.push("2) miAlcancia.dinero = 1000000 → crea una propiedad suelta; #dinero no se tocó.");

  // Intento 3 (no se puede ni escribir):
  // miAlcancia.#dinero = 1000000;   // SyntaxError

  informe.push("Saldo real: " + formato(miAlcancia.saldo) + ". El candado funcionó.");
  mostrar(informe.join("\n"), "error");
  actualizar();
});

// ---------- La trampa SIN encapsulamiento ----------
document.getElementById("btnInsegura1").addEventListener("click", () => {
  insegura.dinero = 1000000;
  actualizar();
});
document.getElementById("btnInsegura2").addEventListener("click", () => {
  insegura.dinero = -500;
  actualizar();
});
document.getElementById("btnInseguraReset").addEventListener("click", () => {
  insegura.dinero = 1000;
  actualizar();
});

actualizar();
