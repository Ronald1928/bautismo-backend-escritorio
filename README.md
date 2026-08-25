# BautiSacrum Backend

Este es el **backend** de BautiSacrum, una aplicación de escritorio para la gestión de certificados de bautismo.

Está desarrollado con **Node.js + Express** y utiliza **SQLite** como base de datos. El backend proporciona la API que utiliza el frontend para registrar, consultar y gestionar los certificados de bautismo.

---

## Estructura del proyecto

```text
bautismo-backend/
│
├── controllers/
│   └── bautismoController.js   # Lógica de las operaciones de bautismo
│
├── database/
│   └── databaseBautismo.sqlite # Base de datos SQLite
│
├── models/
│   └── bautismoModel.js        # Acceso y operaciones con los datos
│
├── pdf/
│   └── generarPdf.js            # Generación de certificados en PDF
│
├── public/
│   └── logo/                    # Recursos utilizados en los certificados
│
├── routes/
│   └── bautismoRoutes.js        # Rutas de la API
│
├── services/
│   └── backupService.js         # Servicio de copias de seguridad
│
├── .env                         # Variables de entorno
├── .gitignore
├── dbConnection.js              # Conexión con SQLite
├── server.js                    # Punto de entrada del servidor
├── package.json
└── README.md
```

---

## Funcionamiento

Las diferentes partes del backend cumplen las siguientes funciones:

- **Routes:** Define los endpoints disponibles para el frontend.
- **Controllers:** Gestiona la lógica de las solicitudes recibidas.
- **Models:** Se encarga de las operaciones relacionadas con los datos.
- **Database:** Almacena los registros de bautismo utilizando SQLite.
- **PDF:** Genera los certificados en formato PDF.
- **Services:** Contiene servicios adicionales, como el sistema de copias de seguridad.
- **Public:** Contiene recursos utilizados por el backend, como el logo de la iglesia.

---

## Base de datos

BautiSacrum utiliza **SQLite**, por lo que no requiere instalar un servidor de base de datos externo.

La base de datos se encuentra en:

```text
database/databaseBautismo.sqlite
```

La conexión y configuración de la base de datos se gestionan desde:

```text
dbConnection.js
```

---

## Generación de certificados

El backend incluye un módulo encargado de generar los certificados de bautismo en formato PDF:

```text
pdf/generarPdf.js
```

Este módulo utiliza los datos almacenados en la base de datos y los recursos disponibles en `public/` para generar los documentos correspondientes.

---

## Copias de seguridad

BautiSacrum cuenta con un sistema de copias de seguridad automáticas
para proteger los registros almacenados en la base de datos SQLite.

Las copias se almacenan en una carpeta independiente del proyecto:

BackupsBautiSacrum/

El sistema:

- Crea la carpeta automáticamente si no existe.
- Realiza copias de la base de datos cada 8 horas.
- Guarda la fecha de la última copia realizada.
- Conserva un máximo de 10 copias.
- Elimina automáticamente las copias más antiguas cuando se supera
  el límite establecido.

Las copias se generan como archivos `.sqlite`, por lo que pueden
utilizarse como respaldo de la base de datos de la aplicación.

---

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/bautismo-backend.git
   ```

2. Entra a la carpeta:

   ```bash
   cd bautismo-backend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

Las dependencias necesarias se encuentran definidas en `package.json`.

---

## Ejecutar el servidor

Para iniciar el backend:

```bash
node server.js
```

El servidor se ejecuta localmente y proporciona la API utilizada por el frontend.

En la aplicación de escritorio, **Electron se encarga de iniciar el backend automáticamente** al ejecutar BautiSacrum.

---

## Frontend

[Ver repositorio del frontend](https://github.com/Ronald1928/iglesia-bautismo-frontend)

---

## Aplicación de escritorio

[Ver repositorio principal de BautiSacrum](https://github.com/Ronald1928/BautiSacrum)

---

## Licencia

Este proyecto es de uso personal y educativo. 🚫 No está destinado para uso comercial sin autorización.
