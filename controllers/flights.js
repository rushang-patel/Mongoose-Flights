const Flight = require('../models/flight');

async function index(req, res) {
  try {
    const flights = await Flight.find();
    res.render('flights/index', { title: 'All Flights', flights });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id).populate('destinations', 'airport arrival');
    res.render('flights/show', { title: 'Flight Detail', flight });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function newFlight(req, res) {
  const airports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'];
  res.render('flights/new', { title: 'Add Flight', airports });
}

async function create(req, res) {
  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function createDestination(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    const { destAirport, arrival } = req.body;
    flight.destinations.push({ airport: destAirport, arrival });
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

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
  delete: deleteFlight
};
