import User from "../models/User.js";
import Session from "../models/Session.js";
import Review from "../models/Review.js";

export const getStats = async (req, res) => {
  try {
    const [totalUsers, totalSessions, totalReviews] = await Promise.all([
      User.countDocuments(),
      Session.countDocuments(),
      Review.countDocuments()
    ]);

    res.json({ totalUsers, totalSessions, totalReviews });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
};
