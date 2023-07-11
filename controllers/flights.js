const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

// Controller actions for flights

const index = (req, res) => {
  Flight.find({}, (err, flights) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('flights/index', { flights });
    }
  });
};

const newFlightForm = (req, res) => {
  res.render('flights/new');
};

const showFlight = (req, res) => {
  const flightId = req.params.id;

  Flight.findById(flightId)
    .populate('tickets')
    .exec((err, flight) => {
      if (err || !flight) {
        console.log(err);
        res.status(404).send('Flight not found');
      } else {
        res.render('flights/show', { flight });
      }
    });
};

const createFlight = (req, res) => {
  const { airline, airport, flightNo, departs } = req.body;

  const newFlight = new Flight({
    airline,
    airport,
    flightNo,
    departs,
  });

  newFlight.save((err, flight) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/flights');
    }
  });
};

const createTicket = (req, res) => {
  const flightId = req.params.id;
  const { seat, price } = req.body;

  Flight.findById(flightId, (err, flight) => {
    if (err || !flight) {
      console.log(err);
      res.status(404).send('Flight not found');
    } else {
      const newTicket = new Ticket({
        seat,
        price,
        flight: flight._id,
      });

      newTicket.save((err, ticket) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          flight.tickets.push(ticket);
          flight.save((err) => {
            if (err) {
              console.log(err);
              res.status(500).send('Internal Server Error');
            } else {
              res.redirect(`/flights/${flightId}`);
            }
          });
        }
      });
    }
  });
};

const deleteFlight = (req, res) => {
  const flightId = req.params.id;

  Flight.findByIdAndDelete(flightId, (err, flight) => {
    if (err || !flight) {
      console.log(err);
      res.status(404).send('Flight not found');
    } else {
      res.redirect('/flights');
    }
  });
};

module.exports = {
  index,
  newFlightForm,
  showFlight,
  createFlight,
  createTicket,
  deleteFlight,
};
