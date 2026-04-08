const fs = require("fs");
const path = require("path");
const { logger } = require("../dbConnection");

const dbPath = path.join(process.cwd(), "database", "databaseBautismo.sqlite");
const backupDir = path.join(process.env.USERPROFILE, "BackupsBautiSacrum");
const lastBackupFile = path.join(backupDir, "lastBackup.json");

const INTERVALO_HORAS = 8;
const MAX_BACKUPS = 10;

function hacerBackup() {
  try {
    // Crear carpeta si no existe
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Nombre del archivo con fecha y hora
    const fecha = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `backup-${fecha}.sqlite`);

    // Copiar base de datos
    fs.copyFileSync(dbPath, backupPath);

    guardarUltimaEjecucion();
    limpiarBackups();
  } catch (error) {
    logger.error("No se pudo crear el backup", error.message);
    logger.error(error);
  }
}

// Guardar última ejecución
function guardarUltimaEjecucion() {
  try {
    fs.writeFileSync(
      lastBackupFile,
      JSON.stringify({ ultimaEjecucion: new Date().toISOString() }),
    );
  } catch (error) {
    logger.error("Error guardando fecha de backup:", error.message);
  }
}

// Verificar si han pasado 8 horas
function verificarSiDebeHacerBackup() {
  try {
    if (!fs.existsSync(lastBackupFile)) {
      hacerBackup();
      return;
    }

    const data = JSON.parse(fs.readFileSync(lastBackupFile));
    const last = new Date(data.ultimaEjecucion);
    const now = new Date();

    const MS_POR_HORA = 1000 * 60 * 60;
    const diffHoras = (now - last) / MS_POR_HORA;

    if (diffHoras >= INTERVALO_HORAS) {
      hacerBackup();
    }
  } catch (error) {
    logger.error("Error verificando backup:", error.message);
  }
}

function limpiarBackups() {
  try {
    const files = fs
      .readdirSync(backupDir)
      .map((file) => ({
        name: file,
        time: fs.statSync(path.join(backupDir, file)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time); // más recientes primero

    if (files.length > MAX_BACKUPS) {
      const filesToDelete = files.slice(MAX_BACKUPS);

      filesToDelete.forEach((file) => {
        fs.unlinkSync(path.join(backupDir, file.name));
      });
    }
  } catch (error) {
    logger.error("Error limpiando backups:", error.message);
  }
}

// Ejecutar mientras la app está abierta
function iniciarBackupAutomatico() {
  setInterval(
    () => {
      hacerBackup();
    },
    INTERVALO_HORAS * 60 * 60 * 1000,
  );
}

module.exports = {
  hacerBackup,
  verificarSiDebeHacerBackup,
  iniciarBackupAutomatico,
};
