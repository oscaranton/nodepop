'use strict';

// dependencias
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var appLib = require('./lib/appLib');

var index = require('./routes/index');
var users = require('./routes/users');

// conexión con la base de datos
require('./lib/connectMongoose');

// modelos para que los use Mongoose
require('./models/Anuncio');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = 'NodePop';
app.locals.author = 'Oscar Antón Galante';
app.locals.description = 'Práctica de Fundamentos de NodeJS + MongoDB';
app.locals.excerpt = 'Sistema de API para listar anuncios con filtro y grabación de anuncios'

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// middleware para elementos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// middleware for the web frontend
app.use('/', index);
app.use('/users', users);

// middleware for the ads API
app.use('/apiv1/anuncios', require ("./routes/apiv1/anuncios"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // If it is an API request, the response is a JSON
  if ( appLib.isAPI(req)) {
    res.json({ succes: false, error: err.message });
    return;
  }

  // Response with an error page

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
