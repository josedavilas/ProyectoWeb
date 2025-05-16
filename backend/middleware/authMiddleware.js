import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware para verificar el token JWT
export const verifyToken = async (req, res, next) => {
  // Obtener cabecera de autorizacion
  const authHeader = req.headers["authorization"];

  // Si no hay token, rechaza el acceso
  if (!authHeader) return res.status(403).json({ message: "Token no proporcionado" });

  // Remueve el prefijo "Bearer " si existe
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verifica el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca al usuario por ID desde el token
    const user = await User.findById(decoded.id).select("id name role");

    // Si no se encuentra, responde con error
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Agrega el usuario al objeto request
    req.user = user;

    // Continua con la siguiente funcion o ruta
    next();
  } catch (err) {
    // Token invalido o expirado
    return res.status(401).json({ message: "Token invalido" });
  }
};
