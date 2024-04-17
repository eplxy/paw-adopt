const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Home', { title: 'Home' });
});

module.exports = router;
