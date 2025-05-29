const pool = require("../db");

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, last_login, status 
       FROM users 
       ORDER BY last_login DESC NULLS LAST`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to get users" });
  }
};

const blockUsers = async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid ids format" });
  }

  try {
    await pool.query(
      `UPDATE users SET status = 'blocked' WHERE id = ANY($1::int[])`,
      [ids]
    );
    res.json({ message: "Users blocked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to block users" });
  }
};

const unblockUsers = async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid ids format" });
  }

  try {
    await pool.query(
      `UPDATE users SET status = 'active' WHERE id = ANY($1::int[])`,
      [ids]
    );
    res.json({ message: "Users unblocked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unblock users" });
  }
};

const deleteUsers = async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid ids format" });
  }

  try {
    await pool.query(`DELETE FROM users WHERE id = ANY($1::int[])`, [ids]);
    res.json({ message: "Users deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete users" });
  }
};

module.exports = {
  getUsers,
  blockUsers,
  unblockUsers,
  deleteUsers,
};
