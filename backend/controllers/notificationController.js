import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ date: -1 })
      .populate("session", "topic");
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener notificaciones" });
  }
};
