const express = require('express');
const router = express.Router();

router.get('/Q123', (req, res) => {
    res.render('Q123index', { title: 'Q123' });
});

router.post('/Q1A', (req, res) => {
    const { number } = req.body;
    const result = findSummation(Number(number));
    res.send(`The result is ${result}`);
});

router.post('/Q1B', (req, res) => {
    const { str } = req.body;
    const result = uppercaseFirstandLast(str);
    res.send(`The result is ${result}`);
});

router.post('/Q1C', (req, res) => {
    const { arr } = req.body;
    const result = findAverageAndMedian(arr);
    res.send(`The average is ${result[0]} and the median is ${result[1]}`);
});

router.post('/Q1D', (req, res) => {
    const { str } = req.body;
    const result = find4Digits(str);
    res.send(`The result is ${result}`);
});


//Q2
const numOfVisitsRouter = require('./numOfVisits.js');
router.get('/Q2', numOfVisitsRouter);

//Q3
const phoneNumbersRouter = require('./phoneNumbers.js');
router.get('/Q3', phoneNumbersRouter);



//function A
function findSummation(n) {

    if (n <= 0 || isNaN(n)) {
        return false;
    }

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
//function B
function uppercaseFirstandLast(str) {
    if(str.length == 1){
        return str.toUpperCase();
    }

    return str.charAt(0).toUpperCase() + str.slice(1, str.length - 1) + str.charAt(str.length - 1).toUpperCase();
}

//function C
function findAverageAndMedian(arr) {
    arr = arr.split(',');
    sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
    }
    let avg = sum / arr.length;


    let median = 0;
    if (arr.length % 2 == 0) {
        median = arr[arr.length / 2];
    } else {
        median = (arr[arr.length / 2] + arr[arr.length / 2 + 1]) / 2;
    }

    return [avg, median];
}

//function D
function find4Digits(str) {
    let numbers = str.split(' ');
    let fourdigits;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i].length === 4) {
            fourdigits = numbers[i];
            break;
        }
    }

    return fourdigits || false;
}


module.exports = router;
