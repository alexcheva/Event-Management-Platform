import { pool } from '../db.js';

export class Event {
  static async getAll() {
    const result = await pool.query('SELECT * FROM events ORDER BY id');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ name, date, location, price, created_by, description, start_time, end_time }) {
    console.log("create Event called")

    const result = await pool.query(
      'INSERT INTO events (name, date, location, price, created_by, description, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [ name, date, location, price, created_by, description, start_time, end_time]
    );
    return result.rows[0];
  }

  static async update(id, { name, date, location, price, created_by, description, start_time, end_time }) {
    const result = await pool.query(
      'UPDATE events SET name=$1, date=$2, location=$3, price=$4, created_by=$5, description=$6, start_time=$7, end_time=$8 WHERE id=$9 RETURNING *',
      [ name, date, location, price, created_by, description, start_time, end_time, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM events WHERE id=$1', [id]);
    return { message: 'Event deleted' };
  }
}
