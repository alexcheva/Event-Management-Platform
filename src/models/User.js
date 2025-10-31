import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

export class User {
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    return result.rows[0];
  }
  
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
  
  static async getAll() {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ name, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role || 'attendee']
    );
    return result.rows[0];
  }

  static async update(id, { name, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'UPDATE users SET name=$1, email=$2, password=$3, role=$4 WHERE id=$5 RETURNING *',
      [name, email, hashedPassword, role, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    return { message: 'User deleted' };
  }

}
