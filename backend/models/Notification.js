import mongoose from "mongoose";

// Esquema de notificaciones
const notificationSchema = new mongoose.Schema({
  // Mensaje de la notificacion
  message: { 
    type: String, 
    required: true 
  },

  // Fecha en la que se creo la notificacion (por defecto es la fecha actual)
  date: { 
    type: Date, 
    default: Date.now 
  },

  // Referencia a una sesion relacionada (opcional)
  session: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Session" 
  }
});

// Exporta el modelo Notification para usarlo en controladores o rutas
export default mongoose.model("Notification", notificationSchema);
