const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',  path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/Q123', (req, res) => {
    res.render('Q123index', { title: 'Q123' });
});

app.post('/Q1A', (req, res) => {
    const { number } = req.body;
    const result = findSummation(Number(number));
    res.send(`The result is ${result}`);
});

app.post('/Q1B', (req, res) => {
    const { str } = req.body;
    const result = uppercaseFirstandLast(str);
    res.send(`The result is ${result}`);
});

app.post('/Q1C', (req, res) => {
    const { arr } = req.body;
    const result = findAverageAndMedian(arr);
    res.send(`The average is ${result[0]} and the median is ${result[1]}`);
});

app.post('/Q1D', (req, res) => {
    const { str } = req.body;
    const result = find4Digits(str);
    res.send(`The result is ${result}`);
});


//Q2
app.use(cookieParser());
const numOfVisitsRouter = require('./numOfVisits.js');
app.use('/Q2', numOfVisitsRouter);

//Q3
const phoneNumbersRouter = require('./phoneNumbers.js');
app.use('/Q3', phoneNumbersRouter);



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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
