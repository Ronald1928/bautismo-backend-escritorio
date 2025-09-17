// Importamos sqlite3
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
//const { app } = require("electron");

const isProd = process.env.NODE_ENV === "production";

let dbPath;

if (isProd) {
  dbPath = path.join(
    process.resourcesPath,
    "database",
    "databaseBautismo.sqlite"
  );
} else {
  dbPath = path.resolve(__dirname, "./database/databaseBautismo.sqlite");
}

//const dbPath = path.resolve(__dirname, "./database/databaseBautismo.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al conectar con SQLite:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos SQLite.");
    console.log("📂 Ruta usada:", dbPath);
  }
});

// Configuramos busy_timeout para esperar si la base está bloqueada
db.run("PRAGMA busy_timeout = 5000");

function inicializarTabla(callback) {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS certificados_bautismo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombreSuscribe TEXT NOT NULL,
        libroBautizo TEXT NOT NULL,
        folioBautizo TEXT NOT NULL,
        numeroArchivo TEXT NOT NULL,
        nombreBautizado TEXT NOT NULL,
        diaNacimiento INTEGER,
        mesNacimiento TEXT,
        anoNacimiento INTEGER,
        lugarNacimiento TEXT,
        nombrePadre TEXT,
        nombreMadre TEXT,
        libroNacimiento TEXT,
        folioNacimiento TEXT,
        archivoNacimiento TEXT,
        anoArchivo INTEGER,
        oficialia TEXT,
        diaBautismo INTEGER,
        mesBautismo TEXT,
        anoBautismo INTEGER,
        padrino TEXT,
        madrina TEXT,
        ministroSacramento TEXT,
        notasMarginales TEXT,
        diaEmision INTEGER,
        mesEmision TEXT,
        anoEmision INTEGER,
        genero TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(numeroArchivo, libroBautizo, folioBautizo)
      )
      `,
      (err) => {
        if (err) {
          console.error("❌ Error al crear/verificar la tabla:", err.message);
        } else {
          console.log("📦 Tabla 'certificados_bautismo' lista.");
        }
        if (callback) callback(); // Llamamos al callback cuando ya terminó
      }
    );
  });
}

// Exportamos la conexión para usar en otros archivos
module.exports = { db, inicializarTabla, dbPath };
