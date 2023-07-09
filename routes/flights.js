const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

// Route for viewing all flights (index)
router.get('/', flightsCtrl.index);

// Route for creating a new flight (new form)
router.get('/new', flightsCtrl.new);

// Route for handling the flight creation (create)
router.post('/', flightsCtrl.create);

// Route for viewing a single flight (show)
router.get('/:id', flightsCtrl.show);

module.exports = router;
