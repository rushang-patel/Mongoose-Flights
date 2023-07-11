const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

// GET all flights
router.get('/', flightsCtrl.index);

// Render the form for adding a new flight
router.get('/new', flightsCtrl.new);

// GET a specific flight by ID
router.get('/:id', flightsCtrl.show);

// Create a new flight
router.post('/', flightsCtrl.create);

// Add a destination to a flight
router.post('/:id/destinations', flightsCtrl.createDestination);

// Render the destinations for a flight
router.get('/:id/destinations', flightsCtrl.showDestinations);

// Delete a flight
router.delete('/:id', flightsCtrl.delete);

module.exports = router;

