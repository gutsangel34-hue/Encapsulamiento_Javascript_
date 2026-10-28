// =====================================================================
//  alcancia.js  ·  Las dos clases del ejemplo (el "modelo")
//  Tema: ENCAPSULAMIENTO en JavaScript (pilar de la POO)
// =====================================================================

// ---------- 1. CON encapsulamiento ----------
class Alcancia {
  // Estado PRIVADO: solo se puede leer o cambiar desde dentro de la clase.
  #dinero = 0;
  #movimientos = [];

  // Método PRIVADO: una regla interna que el exterior no puede llamar.
  #validar(cantidad) {
    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      throw new Error("Escribe una cantidad mayor a $0.");
    }
  }

  // Método PRIVADO: lleva el historial por dentro.
  #registrar(tipo, cantidad) {
    this.#movimientos.push({ tipo, cantidad, saldo: this.#dinero });
  }

  // Interfaz PÚBLICA: la única forma permitida de cambiar el estado.
  guardar(cantidad) {
    this.#validar(cantidad);
    this.#dinero += cantidad;
    this.#registrar("guardar", cantidad);
  }

  sacar(cantidad) {
    this.#validar(cantidad);
    if (cantidad > this.#dinero) throw new Error("No hay suficiente dinero.");
    this.#dinero -= cantidad;
    this.#registrar("sacar", cantidad);
  }

  // GETTER: expone el saldo en solo lectura (no hay setter).
  get saldo() {
    return this.#dinero;
  }

  // GETTER con copia defensiva: devuelve copias para que nadie
  // pueda alterar el historial real desde afuera.
  get historial() {
    return this.#movimientos.map(m => ({ ...m }));
  }
}

// ---------- 2. SIN encapsulamiento (solo para comparar) ----------
class AlcanciaInsegura {
  dinero = 1000;                // público: cualquiera lo puede cambiar

  guardar(cantidad) {
    this.dinero += cantidad;
  }

  sacar(cantidad) {
    this.dinero -= cantidad;
  }
}
