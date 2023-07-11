const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  destAirport: {
    type: String,
    enum: ['LON', 'TOR', 'PHX', 'MIA', 'HON'],
    required: true
  },
  arrival: {
    type: Date,
    required: true
  },
  departure: {
    type: Date,
    required: true
  }
});

const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  }
});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United', 'Spirit', 'Frontier'],
    required: true
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'AUS'
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function () {
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      return oneYearFromNow;
    }
  },
  destinations: [destinationSchema]
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {
  Flight,
  Ticket
};
