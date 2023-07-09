const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// Route for viewing all flights (index)
router.get('/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.render('flights/index', { flights });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route for creating a new flight (new form)
router.get('/flights/new', (req, res) => {
  res.render('flights/new');
});

// Route for handling the flight creation (create)
router.post('/flights', async (req, res) => {
  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
