const pool = require('../config/db');
 
const UserModel = {
  async create({ username, email, passwordHash }) {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, role, created_at`,
      [username, email, passwordHash]
    );
    return result.rows[0];
  },
 
  async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },
 
  async findById(id) {
    const result = await pool.query(
      `SELECT id, username, email, role, created_at FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = UserModel;