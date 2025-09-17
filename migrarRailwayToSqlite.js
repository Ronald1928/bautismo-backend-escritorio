const mysql = require("mysql2/promise");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

async function migrar() {
  try {
    // 1️⃣ Conexión a MySQL en Railway
    const mysqlConn = await mysql.createConnection({
      host: "metro.proxy.rlwy.net",
      port: "38418",
      user: "root",
      password: "DHULKPDxRHSnjqHZfBVaSQUKqhNaxDpe",
      database: "railway",
    });
    console.log("✅ Conectado a MySQL (Railway)");

    // 2️⃣ Conexión a SQLite local
    const sqlitePath = path.resolve(
      __dirname,
      "./database/databaseBautismo.sqlite"
    );
    const sqliteDB = new sqlite3.Database(sqlitePath, (err) => {
      if (err) throw err;
      console.log("✅ Conectado a SQLite local");
    });

    // 3️⃣ Leer datos de MySQL
    const [rows] = await mysqlConn.execute(
      "SELECT * FROM certificados_bautismo"
    );
    console.log(`Se encontraron ${rows.length} registros en MySQL`);

    // 4️⃣ Crear tabla SQLite si no existe
    sqliteDB.serialize(() => {
      sqliteDB.run(`
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
      `);

      // 5️⃣ Insertar datos
      const stmt = sqliteDB.prepare(`
        INSERT OR REPLACE INTO certificados_bautismo
        (
    nombreSuscribe, libroBautizo, folioBautizo, numeroArchivo,
    nombreBautizado, diaNacimiento, mesNacimiento, anoNacimiento,
    lugarNacimiento, nombrePadre, nombreMadre,
    libroNacimiento, folioNacimiento, archivoNacimiento, anoArchivo,
    oficialia, diaBautismo, mesBautismo, anoBautismo,
    padrino, madrina, ministroSacramento, notasMarginales,
    diaEmision, mesEmision, anoEmision, genero
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

      rows.forEach((row) => {
        stmt.run(
          row.nombreSuscribe,
          row.libroBautizo,
          row.folioBautizo,
          row.numeroArchivo,
          row.nombreBautizado,
          row.diaNacimiento,
          row.mesNacimiento,
          row.anoNacimiento,
          row.lugarNacimiento,
          row.nombrePadre,
          row.nombreMadre,
          row.libroNacimiento,
          row.folioNacimiento,
          row.archivoNacimiento,
          row.anoArchivo,
          row.oficialia,
          row.diaBautismo,
          row.mesBautismo,
          row.anoBautismo,
          row.padrino,
          row.madrina,
          row.ministroSacramento,
          row.notasMarginales,
          row.diaEmision,
          row.mesEmision,
          row.anoEmision,
          row.genero
        );
      });

      stmt.finalize();
    });

    console.log("✅ Migración completada correctamente");
    await mysqlConn.end();
    sqliteDB.close();
  } catch (err) {
    console.error("❌ Error migrando datos:", err);
  }
}

// Ejecutar la migración
migrar();
