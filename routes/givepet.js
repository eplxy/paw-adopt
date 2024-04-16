var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('GivePet', { title: 'GivePet' });
});

module.exports = router;
