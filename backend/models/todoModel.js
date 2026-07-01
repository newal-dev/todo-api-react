const pool = require('../config/db');

const TodoModel = {
  async findAllByUser(userId) {
    const result = await pool.query(
      `SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async findByIdAndUser(id, userId) {
    const result = await pool.query(
      `SELECT * FROM todos WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
    return result.rows[0];
  },

  async create(userId, { title, description, priority, due_date }) {
    const result = await pool.query(
      `INSERT INTO todos (user_id, title, description, priority, due_date)
       VALUES ($1, $2, $3, COALESCE($4, 'medium'), $5)
       RETURNING *`,
      [userId, title, description || null, priority, due_date || null]
    );
    return result.rows[0];
  },

  async update(id, userId, fields) {
    const { title, description, priority, due_date, is_done } = fields;
    const result = await pool.query(
      `UPDATE todos
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           priority = COALESCE($3, priority),
           due_date = COALESCE($4, due_date),
           is_done = COALESCE($5, is_done),
           updated_at = NOW()
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, priority, due_date, is_done, id, userId]
    );
    return result.rows[0];
  },

  async delete(id, userId) {
    const result = await pool.query(
      `DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id`,
      [id, userId]
    );
    return result.rows[0];
  }
};

module.exports = TodoModel; 