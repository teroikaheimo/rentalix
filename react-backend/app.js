var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var indexRouter = require('./routes/index');
var itemRouter = require('./routes/item');
var itemsRouter = require('./routes/items');
var userRouter = require('./routes/user');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser({secret:"klk2j72lk6gSFGHSh4YJHZHAD"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:"klk2j72lk6gSFGHSh4YJHZHAD",saveUninitialized:false,resave:false}));
app.use((req)=>{ // Set login to false if session is not found.
    if(!req.session.login){
        req.session.login = false;
    }
    next();
});


app.use('/', indexRouter); // Instructions to use API
app.use('/item', itemsRouter); // Item search
app.use('/items', itemsRouter); // Items search
app.use('/user', userRouter);
app.use('/register',registerRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
