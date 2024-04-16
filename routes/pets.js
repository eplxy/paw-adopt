var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pets', { title: 'Browse' });
});

module.exports = router;
