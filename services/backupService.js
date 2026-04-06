import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "database", "databaseBautismo.sqlite");
const backupDir = "C:/BackupsBautiSacrum";

const MAX_BACKUPS = 10;

export function hacerBackup() {
  try {
    // Crear carpeta si no existe
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Nombre del archivo con fecha y hora
    const now = new Date();
    const fecha = now.toISOString().replace(/[:.]/g, "-");

    const backupPath = path.join(backupDir, `backup-${fecha}.db`);

    // Copiar base de datos
    fs.copyFileSync(dbPath, backupPath);

    // Limpiar backups antiguos
    limpiarBackups();
  } catch (error) {
    console.error("No se pudo crear el backup", error.message);
  }
}

function limpiarBackups() {
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
}
