import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Cargar variables de entorno desde .env
dotenv.config();

// Inicializar la aplicacion Express
const app = express();

// Habilitar uso de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware global
app.use(cors()); // Permite solicitudes desde otros origenes
app.use(express.json()); // Habilita lectura de JSON en las solicitudes

// Rutas para notificaciones
import notificationRoutes from "./routes/notifications.js";
app.use("/api/notifications", notificationRoutes);

// Servir archivos estaticos (HTML, CSS, JS) desde la carpeta frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Rutas para sesiones
import sessionRoutes from "./routes/sessions.js";
app.use("/api/sessions", sessionRoutes);

// Rutas para usuarios y estadisticas
import userRoutes from "./routes/users.js";
import statsRoutes from "./routes/stats.js";
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);

// Rutas de autenticacion
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Conectar a MongoDB y levantar el servidor
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Error de conexion MongoDB:", err));
