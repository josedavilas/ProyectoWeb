import express from "express";
import {
  getAllUsers,
  getUserById,
  approveUser,
  deleteUser
} from "../controllers/userController.js"; // Controladores de usuarios

import { verifyToken } from "../middleware/authMiddleware.js"; // Middleware de autenticacion

const router = express.Router(); // Crear instancia de router

// Obtener todos los usuarios (solo si esta autenticado)
router.get("/", verifyToken, getAllUsers);

// Obtener un usuario por ID
router.get("/:id", verifyToken, getUserById);

// Aprobar un usuario (cambiar su estado)
router.patch("/:id/approve", verifyToken, approveUser);

// Eliminar un usuario por ID
router.delete("/:id", verifyToken, deleteUser);

// Exportar router para usar en el servidor principal
export default router;
