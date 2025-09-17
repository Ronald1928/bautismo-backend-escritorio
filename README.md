# 📌 Bautismo Backend

Este es el **backend** de la aplicación de gestión de certificados de bautismo (versión escritorio).  
Está desarrollado en **Node.js + Express** y utiliza **SQLite** como base de datos.

---

## ⚙️ Instalación y configuración

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/bautismo-backend.git
   ```

2. Entra a la carpeta del proyecto:
   cd bautismo-backend

3. Instala las dependencias:

   **npm install**

   (Esto instala automáticamente todas las dependencias listadas en dependencies y devDependencies, no tienes que poner una por una).

   Este proyecto usa las siguientes librerías de Node.js:

   **axios** – Para hacer solicitudes HTTP (si lo usas en tu backend).

   **body-parser** – Middleware para parsear el body de las peticiones.

   **cors** – Habilita peticiones desde el frontend (CORS).

   **dotenv** – Manejo de variables de entorno.

   **express** – Framework principal del servidor.

   **mysql2** – Conector para MySQL.

   **puppeteer** – Generación de PDFs.

   **sqlite y sqlite3** – Base de datos SQLite (si usas modo local).

⚙️ Dependencias de desarrollo

    @types/axios – Tipados de Axios para TypeScript.

## Ejecutar el servidor

Para ejecutar esta app en otro computador, es necesario verificar si ya se instalo las dependencias de Chromium que Puppeteer necesita
**npx puppeteer browsers install chrome**

Volver a confirmar dependencias con
**npm install**

En caso de que lo quieras ejecutar en segundo plano, ejecutar un archivo .vbs en el programador de tareas.

📜 Licencia

Este proyecto es de uso personal y educativo. 🚫 No está destinado para uso comercial sin autorización.
