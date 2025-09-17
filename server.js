const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bautismoRoutes = require("./routes/bautismoRoutes");
const { db, inicializarTabla } = require("./dbConnection");

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: ["http://localhost:5173"], // permite frontend local y producción
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Inicializamos tabla y luego arrancamos servidor
inicializarTabla(() => {
  app.use("/api/certificados_bautismo", bautismoRoutes);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});
