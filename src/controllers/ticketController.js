import { TicketType } from '../models/TicketType.js';
import QRCode from "qrcode";

export const addTicketType = async (req, res) => {
  console.log("addTicketType called req", req.body)
  const { type, price, capacity } = req.body;
  const event_id = req.params.id;

  try {
    const newType = await TicketType.create({
      event_id, type, price, capacity
    });
    res.json(newType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getTicketTypes = async (req, res) => {
  try {
    const events = await TicketType.getAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTicketTypeById = async (req, res) => {
   console.log("getTicketTypeById called req", req.body)
  try {
    const ticketType = await TicketType.getById(req.params.id);
    if (!ticketType) return res.status(404).json({ message: 'TicketType not found' });
    res.json(ticketType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTicketType = async (req, res) => {
  console.log("createTicketType called req", req.body)
  try {
    const ticketType = await TicketType.create(req.body);
    res.status(201).json(ticketType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTicketType = async (req, res) => {
  try {
    const ticketType = await TicketType.update(req.params.id, req.body);
    res.json(ticketType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTicketType = async (req, res) => {
  try {
    const result = await TicketType.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const purchaseTicket = async (req, res) => {
  console.log("purchaseTicket called req", req.body)
  // purchaseTicket called req { event_id: 1, ticket_type_id: 1, user_id: 4 }
  const { event_id, ticket_type_id, user_id } = req.body;

  try {
    const ticketType = await TicketType.findByPk(ticket_type_id);
    console.log("purchaseTicket ticketType", ticketType)
    if (!ticketType || ticketType.sold >= ticketType.capacity) {
      return res.status(400).json({ msg: "Sold out" });
    }

    const payload = `${event_id}-${user_id}-${Date.now()}`;
    console.log("purchaseTicket payload", payload)
    const qr = await QRCode.toDataURL(payload);
    console.log("purchaseTicket qr", qr)

    const ticket = await TicketType.purchase({
      event_id, user_id, ticket_type_id, qr_code: qr
    });

    // TODO update the ticket sales:
    // ticketType.sold += 1;
    // await ticketType.save();

    res.json({
      msg: "Ticket purchased!",
      ticket
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTickets = async (req, res) => {
  console.log("getTickets called", req)
  try {
    const tickets = await TicketType.showAllTickets();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTicketsById = async (req, res) => {
   console.log("getTicketsById called req", req.body)
  try {
    const ticket = await TicketType.getAllTicketsByUserId(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'TicketType not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Example response
// {
//   "msg": "Ticket purchased!",
//   "ticket": {
//     "id": 12,
//     "event_id": 3,
//     "user_id": 5,
//     "ticket_type_id": 1,
//     "qr_code": "data:image/png;base64,iVBORw0KGg..."
//   }
// }