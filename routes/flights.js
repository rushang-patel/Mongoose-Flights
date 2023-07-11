const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');
const ticketsCtrl = require('../controllers/tickets');

// GET all flights
router.get('/', flightsCtrl.index);

// Render the form for adding a new flight
router.get('/new', flightsCtrl.newFlightForm);

// GET a specific flight by ID
router.get('/:id', flightsCtrl.showFlight);

// Create a new flight
router.post('/', flightsCtrl.createFlight);

// Add a destination to a flight
router.post('/:id/destinations', flightsCtrl.createDestination);

// Render the destinations for a flight
router.get('/:id/destinations', flightsCtrl.showDestinations);

// Delete a flight
router.delete('/:id', flightsCtrl.deleteFlight);

// Render the new ticket form for a flight
router.get('/:id/tickets/new', ticketsCtrl.newTicketForm);

// Create a new ticket for a flight
router.post('/:id/tickets', ticketsCtrl.createTicket);

module.exports = router;
