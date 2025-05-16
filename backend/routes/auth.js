import express from "express";
import bcrypt from "bcryptjs"; // Para encriptar contraseñas
import jwt from "jsonwebtoken"; // Para generar tokens JWT
import User from "../models/User.js"; // Modelo de usuario

const router = express.Router(); // Crear instancia de router

// Ruta POST para registrar nuevos usuarios
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verifica si el correo ya esta registrado
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Correo ya registrado" });

    // Encripta la contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Crea el nuevo usuario y lo guarda en la base de datos
    const newUser = new User({ name, email, password: hashed, role });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Ruta POST para iniciar sesion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca el usuario por correo
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Compara la contraseña ingresada con la almacenada
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

    // Genera un token con el ID y rol del usuario
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Responde con el token y datos basicos del usuario
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesion" });
  }
});

export default router; // Exporta las rutas para usarlas en el servidor principal
