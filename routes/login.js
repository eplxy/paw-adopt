const express = require('express');
const router = express.Router();
const fs = require('fs');
const { use } = require('./signup');

router.get('/', function (req, res, next) {
  res.render('login', { message: '' });
});

router.post('/', function (req, res, next) {

  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);

  const entries = fs.readFileSync('./textfiles/users.txt', 'utf8', function (err, data) {
    if (err) { console.error('Error reading file:', err); }
  }).split('\n');
  const users = [];
  const passwords = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i].trim();
    const entryUsername = entry.substring(0, entry.indexOf(':')).trim(); 
    const entryPassword = entry.substring(entry.indexOf(':') + 1).trim();

    if (entryUsername.toLowerCase() === username.toLowerCase() && entryPassword === password) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect(req.session.returnTo || '/');
      return;
    }
  }

  res.render('login', { message: 'Invalid credentials, please try again.' });
});


module.exports = router;
