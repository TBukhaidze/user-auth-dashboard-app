const express = require("express");
const router = express.Router();
const authenticateAndCheckStatus = require("../middleware/authenticateAndCheckStatus.js");
const {
  getUsers,
  blockUsers,
  unblockUsers,
  deleteUsers,
} = require("../controllers/userController");

router.use(authenticateAndCheckStatus);

router.get("/me", async (req, res) => {
  try {
    const result = await require("../db").query(
      "SELECT id, name, email, last_login, status FROM users WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Failed to get user info" });
  }
});

router.get("/", getUsers);
router.post("/block", blockUsers);
router.post("/unblock", unblockUsers);
router.post("/delete", deleteUsers);

module.exports = router;
