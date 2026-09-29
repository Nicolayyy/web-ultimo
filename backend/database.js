const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tienda.db", (error) => {
  if (error) {
    console.error("Error al conectar con SQLite:", error.message);
  } else {
    console.log("Conectado correctamente a SQLite");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS proveedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      contacto TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      precio INTEGER NOT NULL,
      existencias INTEGER NOT NULL,
      proveedor_id INTEGER NOT NULL,
      FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
    )
  `);
});

module.exports = db;