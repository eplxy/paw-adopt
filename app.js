const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home.js');
const petsRouter = require('./routes/pets.js');
const findRouter = require('./routes/find.js');
const dogcareRouter = require('./routes/dogcare.js');
const catcareRouter = require('./routes/catcare.js');
const contactRouter = require('./routes/contact.js');
const giveRouter = require('./routes/givepet.js');
const Q123Router = require('./Q123/server.js');
const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'public', 'views'), path.join(__dirname, 'Q123', 'views')]);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', indexRouter);
app.use('/Q123', Q123Router);
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

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;
