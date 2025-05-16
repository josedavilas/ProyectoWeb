import express from "express";
import { getNotifications } from "../controllers/notificationController.js"; // Controlador para obtener notificaciones

const router = express.Router(); // Crear instancia de router

// Ruta GET para obtener todas las notificaciones
router.get("/", getNotifications);

// Exporta el router para ser usado en el servidor principal
export default router;
