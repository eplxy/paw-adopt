const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home.js');
const petsRouter = require('./routes/pets.js');
const findRouter = require('./routes/find.js');
const dogcareRouter = require('./routes/dogcare.js');
const catcareRouter = require('./routes/catcare.js');
const contactRouter = require('./routes/contact.js');
const giveRouter = require('./routes/givepet.js');
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
// const Q123Router = require('./Q123/server.js');
const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'public', 'views', 'pages')]);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

//session setup
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});


app.use('/', indexRouter);
// app.use('/Q123', Q123Router);
app.use('/home', homeRouter);
app.use('/pets', petsRouter);
app.use('/find', findRouter);
app.use('/dogcare', dogcareRouter);
app.use('/catcare', catcareRouter);
app.use('/contactus', contactRouter);
app.use('/givepet', giveRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);

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

const PORT = process.env.port || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;
