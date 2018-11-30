var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');

var itemsRouter = require('./routes/items');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var userRouter = require('./routes/user');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../react-client/build')));
app.use(expressSession({
    secret: 'oipgaFHGKJfjJH¤%/reh!¤%Y!Haryj322ahrA',
    resave: false,
    saveUninitialized: true
})); // TODO This 'secret' is shared in GITHUB so change it if needed to keep secret.

app.use('/items', itemsRouter); // Items search
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register',registerRouter);
app.use('/user',userRouter);


app.use(function(req, res, next) { // Redirect all remaining routes to login page.
    res.redirect('localhost:3210');
});

module.exports = app;
