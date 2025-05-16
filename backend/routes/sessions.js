import express from "express";
import {
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
  getUserSessions,
  registerStudent
} from "../controllers/sessionController.js"; // Controladores para manejar sesiones

import { verifyToken } from "../middleware/authMiddleware.js"; // Middleware para validar autenticacion

const router = express.Router(); // Instancia de router

// Crear una nueva sesion (solo usuarios autenticados)
router.post("/", verifyToken, createSession);

// Obtener todas las sesiones disponibles (publico)
router.get("/", getAllSessions);

// Actualizar una sesion por ID (solo autenticado)
router.put("/:id", verifyToken, updateSession);

// Eliminar una sesion por ID (solo autenticado)
router.delete("/:id", verifyToken, deleteSession);

// Registrar un estudiante en una sesion (solo autenticado)
router.post("/:id/register", verifyToken, registerStudent);

// Obtener el historial de sesiones del usuario autenticado
router.get("/history", verifyToken, getUserSessions);

// Exportar las rutas para usarlas en el servidor
export default router;
