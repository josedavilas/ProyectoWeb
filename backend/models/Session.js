import mongoose from "mongoose";

// Esquema de sesiones de asesoria
const sessionSchema = new mongoose.Schema({
  // Tema de la sesion
  topic: {
    type: String,
    required: true,
    trim: true // Elimina espacios al inicio y final
  },
  // Referencia al asesor (usuario que imparte)
  advisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Relacion con el modelo User
    required: true
  },
  // Fecha de la sesion (formato como "2025-05-20")
  date: {
    type: String,
    required: true
  },
  // Hora de la sesion (formato como "14:00")
  time: {
    type: String,
    required: true
  },
  // Lista de estudiantes registrados en la sesion
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Cada estudiante es un usuario
  }]
}, { 
  timestamps: true // Agrega createdAt y updatedAt automaticamente
});

// Exporta el modelo Session para usarlo en controladores
export default mongoose.model("Session", sessionSchema);
