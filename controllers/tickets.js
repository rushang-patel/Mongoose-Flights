const Ticket = require('../models/ticket');

// Render the new ticket form for a flight
function newTicketForm(req, res) {
  res.render('tickets/new', { flightId: req.params.id });
}

// Create a new ticket for a flight
async function createTicket(req, res) {
  try {
    const { seat, price } = req.body;
    const flightId = req.params.id;
    const ticket = await Ticket.create({ seat, price, flight: flightId });
    res.redirect(`/flights/${flightId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  newTicketForm,
  createTicket
};
