# Encapsulamiento en JavaScript · Alcancía

Ejemplo del pilar **encapsulamiento** de la Programación Orientada a Objetos, hecho en JavaScript.

## ¿Qué demuestra?
- **Estado privado:** `#dinero` y `#movimientos` solo se tocan desde dentro de la clase.
- **Métodos privados:** `#validar()` y `#registrar()` ocultan reglas internas.
- **Interfaz pública:** `guardar()` y `sacar()` son la única forma de cambiar el estado.
- **Getters:** `saldo` e `historial` son de solo lectura (el historial devuelve copias).
- **Contraste:** `AlcanciaInsegura` tiene `dinero` público y se puede romper desde afuera.

## Estructura
- `JS/alcancia.js`: las clases `Alcancia` y `AlcanciaInsegura`.
- `JS/main.js`: conecta las clases con la página.
- `HTML/Index.html` y `CSS/styles.css`: la interfaz.
- `uml-alcancia.png`: diagrama de clases UML.

## Cómo ejecutarlo
Abre `index.html` (o `HTML/Index.html`) en el navegador. No necesita instalar nada.

## Autor
Angel Vásquez Sequeda, Samuel solano, Alexis Davila ,Alejandro Alaguna · Universidad de La Salle · Lenguaje de Programación II
