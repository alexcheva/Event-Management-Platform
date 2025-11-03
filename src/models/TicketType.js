import { pool } from '../db.js';

// "ticket": {
// //     "id": 12,
// //     "event_id": 3,
// //     "user_id": 5,
// //     "ticket_type_id": 1,
// //     "qr_code": "data:image/png;base64,iVBORw0KGg..."
// //   }

export class TicketType {
  static async getAll() {
    const result = await pool.query('SELECT * FROM event_ticket_types ORDER BY id');
    return result.rows;
  }

  static async getTicketTypesByEventId(id) {
    const result = await pool.query('SELECT * FROM event_ticket_types WHERE event_id = $1', [id]);
    return result.rows[0];
  }

  static async create({ event_id, user_id, capacity, price, sold }) {
    console.log("create createEventType called")

    const result = await pool.query(
      'INSERT INTO event_ticket_types (event_id, user_id, capacity, price, sold) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [ event_id, user_id, capacity, price, sold]
    );
    return result.rows[0];
  }

  static async update(id, { event_id, user_id, capacity, price, sold }) {
    const result = await pool.query(
      'UPDATE event_ticket_types SET event_id=$1, user_id=$2, capacity=$3, price=$4, sold=$5, description=$6, start_time=$7, end_time=$8 WHERE id=$9 RETURNING *',
      [ event_id, user_id, capacity, price, sold, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM event_ticket_types WHERE id=$1', [id]);
    return { message: 'EventTicketType deleted' };
  }

  static async getById(id) {
    console.log("called getById id", id)
    const result = await pool.query('SELECT * FROM event_ticket_types WHERE id = $1', [id]);
    console.log("called getById result", result)
    return result.rows[0];
  }

  static async findByPk(id) {
    console.log("called findByPk id", id)
    const result = await pool.query('SELECT * FROM event_ticket_types WHERE id = $1', [id]);
    console.log("called findByPk result", result)
    return result.rows[0];
  }

  static async purchase({ event_id, user_id, ticket_type_id, qr_code }) {
    console.log("purchase TicketType called event_id, user_id, ticket_type_id, qr_code", event_id, user_id, ticket_type_id, qr_code)

    const result = await pool.query(
      'INSERT INTO tickets (event_id, user_id, ticket_type_id, qr_code ) VALUES ($1, $2, $3, $4) RETURNING *',
      [ event_id, user_id, ticket_type_id, qr_code]
    );
    return result.rows[0];
  }
  
  static async showAllTickets() {
    const result = await pool.query('SELECT * FROM tickets ORDER BY id');
    return result.rows;
  }

  static async getAllTicketsByUserId(id) {
    const result = await pool.query('SELECT * FROM tickets WHERE user_id = $1', [id]);
    return result.rows[0];
  }
}
