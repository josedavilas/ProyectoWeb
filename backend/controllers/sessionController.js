import Session from "../models/Session.js";
import Notification from "../models/Notification.js";

export const createSession = async (req, res) => {
  try {
    const { topic, date, time } = req.body;
    const advisor = req.user.id;

    let session = await Session.create({ topic, advisor, date, time });

    // Crear notificación al publicar sesión
    await Notification.create({
      message: `Nueva asesoría publicada: ${session.topic}`,
      session: session._id
    });
    
    console.log("✅ Notificación creada para:", session.topic);
    

    // 🔁 rellenar datos del asesor (name)
    session = await session.populate("advisor", "name");

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: "Error al crear sesión" });
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("advisor", "name");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener sesiones públicas" });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    let sessions;

    if (req.user.role === "advisor" || req.user.role === "admin") {
      sessions = await Session.find({ advisor: req.user.id }).populate("advisor", "name");
    } else {
      sessions = await Session.find({ students: req.user.id }).populate("advisor", "name");
    }

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener sesiones del usuario" });
  }
};


export const getSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role; 
    console.log("Usuario autenticado:", req.user);


    let sessions;

    if (userRole === "admin") {
      // Admin puede ver todas
      sessions = await Session.find().populate("advisor", "name");
    } else {
      // Asesor solo ve sus sesiones
      sessions = await Session.find({ advisor: userId }).populate("advisor", "name");
    }

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener sesiones" });
  }
};

export const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) return res.status(404).json({ message: "Sesión no encontrada" });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar sesión" });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: "Sesión no encontrada" });

    res.json({ message: "Sesión eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar sesión" });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Sesión no encontrada" });

    if (session.students.includes(req.user.id)) {
      return res.status(400).json({ message: "Ya estás registrado en esta sesión" });
    }

    session.students.push(req.user.id);
    await session.save();

    res.json({ message: "Registro exitoso en la sesión" });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar en sesión" });
  }
};
