import express from 'express';
import {
  getTicketTypes,
  getTicketTypeById,
  createTicketType,
  updateTicketType,
  deleteTicketType,
  purchaseTicket,
  getTickets,
  getTicketsById
} from '../controllers/ticketController.js';

const router = express.Router();

router.get('/:eventId/ticket-types', getTicketTypes);
router.get('/:id', getTicketTypeById);
router.post('/', createTicketType);
router.put('/:id', updateTicketType);
router.delete('/:id', deleteTicketType);

router.post("/:eventId/purchase/:ticketTypeId", purchaseTicket);
router.get('/all', getTickets);
router.get('/:userId/all', getTicketsById);

export default router;