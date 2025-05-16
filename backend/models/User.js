import mongoose from "mongoose";

// Definicion del esquema para usuarios
const userSchema = new mongoose.Schema({
  // Nombre del usuario
  name: String,

  // Correo electronico (debe ser unico)
  email: { type: String, unique: true },

  // Contraseña encriptada
  password: String,

  // Rol del usuario: estudiante, asesor o administrador
  role: {
    type: String,
    enum: ["student", "advisor", "admin"],
    default: "student"
  },

  // Estado de la cuenta: activa o pendiente de aprobacion
  status: {
    type: String,
    enum: ["Activo", "Pendiente"],
    default: "Pendiente"
  }
});

// Exporta el modelo User para usarlo en controladores y rutas
export default mongoose.model("User", userSchema);
