const express = require('express');
const router = express.Router();
const session = require('express-session');
const fs = require('fs');


router.get('/', function (req, res, next) {
  if (req.session.loggedin) {
    res.render('GivePet', { title: 'GivePet' });
  } else {
    req.session.returnTo = '/givepet';
    res.redirect('/login');
  }
});


router.post('/', function (req, res, next) {
  let counter;

  fs.readFile('./textfiles/pets.txt', 'utf8', function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      const lines = data.split('\n');
      counter = lines.length;

      const petname = req.body.name;
      const pettype = req.body.type;
      const petbreed = req.body.breed;
      const petage = req.body.age;
      const petgender = req.body.gender;
      const petgetalong = req.body.get_along;
      const petcomments = req.body.comments;

      const pet = `${counter}:${req.session.username}:${petname}:${pettype}:${petbreed}:${petage}:${petgender}:${petgetalong}:${petcomments}\n`;

      fs.appendFile('./textfiles/pets.txt', pet, function (err) {
        if (err) { console.error('Error writing to file:', err); }
      });

      res.render('givepetconfirm');
    }
  });
});

module.exports = router;
