const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    if (req.cookies.visits) {
        req.cookies.visits++;
    } else {
        req.cookies.visits = 1;
    }
    res.cookie('visits', req.cookies.visits);

    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZoneName: 'short',
        year: 'numeric',
        hour12: false 
    };
    let currentDate = new Date()
    const lastVisitTime = currentDate.toLocaleString('en-CA', options);

    // Set the 'lastVisit' cookie to the current date and time
    res.cookie('lastVisit', lastVisitTime);

    res.send(req.cookies.visits ? `You have visited this page ${req.cookies.visits} times` 
    + `<br><b>Last time you visited my webpage on: ${req.cookies.lastVisit}<b>`
    + `<br><a href="/Q123">Go back to the main page</a>`
    
    : 'Welcome to my webpage! It is your first time that you are here.')
    

  });

module.exports = router;
