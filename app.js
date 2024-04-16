const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');
const petsRouter = require('./routes/pets');
const findRouter = require('./routes/find');
const dogcareRouter = require('./routes/dogcare');
const catcareRouter = require('./routes/catcare');
const contactRouter = require('./routes/contact');
const giveRouter = require('./routes/givepet');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public', 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/pets', petsRouter);
app.use('/find', findRouter);
app.use('/dogcare', dogcareRouter);
app.use('/catcare', catcareRouter);
app.use('/contactus', contactRouter);
app.use('/givepet', giveRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.sendFile(express.static(path.join(__dirname, 'public', 'views', 'index.html')));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.port || 8080;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })


//A3-Q1
//function A
function findSummation(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
//function B
function uppercaseFirstandLast(str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length - 1) + str.charAt(str.length - 1).toUpperCase();
}

//function C
function findAverageAndMedian(arr) {
    sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
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

    for (let i = 0; i < digits.length; i++) {
        if (numbers[i].length === 4) {
            fourdigits = numbers[i];
            break;
        }
    }

    //assumption : 0000 is not to be considered as a 4 digit number
    return fourdigits || false;
}









module.exports = app;
