const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const authenticateAndCheckStatus = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const result = await pool.query("SELECT status FROM users WHERE id = $1", [
      req.user.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    if (result.rows[0].status === "blocked") {
      return res.status(403).json({ message: "User is blocked" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateAndCheckStatus;
