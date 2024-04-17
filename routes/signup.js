const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
    res.render('signup', { message: '' });
});


function validateUsername(username) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
}

function validatePassword(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;
    return regex.test(password);
}

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const users = fs.readFileSync('./textfiles/users.txt', 'utf8').split('\n').map(line => line.split(':')[0]);

    if (!validateUsername(username)) {
        res.render('signup', { message: 'Invalid username' });
        return;
    }

    if (!validatePassword(password)) {
        res.render('signup', { message: 'Invalid password' });
        return;
    }

    if (users.includes(username.toLowerCase())) {
        res.render('signup', { message: 'Username already exists' });
    } else {
        fs.appendFile('./textfiles/users.txt', `${username}:${password}\n`, function (err) {
            if (err) { console.error('Error writing to file:', err); }
        });
        res.render('signupconfirm');
    }
});


module.exports = router;
