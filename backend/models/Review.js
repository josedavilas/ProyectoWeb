import mongoose from "mongoose";

// Esquema de reseñas para sesiones
const reviewSchema = new mongoose.Schema({
  // Referencia a la sesion que se califico
  sessionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Session" 
  },
  // Usuario que hizo la reseña
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  // Nombre del asesor al que se califica (guardado como texto)
  advisor: String,

  // Tema de la sesion (guardado como texto)
  topic: String,

  // Calificacion dada (por ejemplo, 4 o 5)
  rating: Number,

  // Comentario adicional
  comment: String,

  // Fecha en la que se hizo la reseña (formato texto)
  date: String
});

// Exporta el modelo Review para usarlo en rutas o controladores
export default mongoose.model("Review", reviewSchema);

