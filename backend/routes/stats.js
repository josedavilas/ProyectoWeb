import express from "express";
import { getStats } from "../controllers/statsController.js"; // Controlador para obtener estadisticas
import { verifyToken } from "../middleware/authMiddleware.js"; // Middleware para verificar autenticacion

const router = express.Router(); // Crear instancia de router

// Ruta GET para obtener las estadisticas de la plataforma
// Solo accesible si el token es valido
router.get("/", verifyToken, getStats);

// Exporta el router para usarlo en el servidor
export default router;
