var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Find', { title: 'Find' });
});

module.exports = router;
