const Flight = require('../models/flight');

// Fetch all flights
async function index(req, res) {
  try {
    const flights = await Flight.find();
    res.render('flights/index', { title: 'All Flights', flights });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

// Show a specific flight
async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { title: 'Flight Detail', flight });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

// Render the form for adding a new flight
function newFlight(req, res) {
  const airports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'];
  res.render('flights/new', { title: 'Add Flight', airports });
}

// Create a new flight
async function create(req, res) {
  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

// Add a destination to a flight
async function createDestination(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    const { destAirport, arrival, departure } = req.body;
    flight.destinations.push({ destAirport, arrival, departure });
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

// Render the destinations for a flight
async function showDestinations(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/destinations', { title: 'Flight Destinations', destinations: flight.destinations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

// Delete a flight
async function deleteFlight(req, res) {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.redirect('/flights');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  index,
  show,
  new: newFlight,
  create,
  createDestination,
  showDestinations,
  delete: deleteFlight
};
