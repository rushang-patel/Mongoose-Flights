var express = require('express');
var router = express.Router();

// Route for the homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Mongoose Airport' });
});

module.exports = router;
