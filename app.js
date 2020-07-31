/**
 * The purpose of this file is to start off the node
 * application.
 *
 * @author jo3-w3b-d3v
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const app = express();

// Setup the view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Setup the relevant routes.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Handle some 404 requests.
app.use(function(req, res, next) {
  const createError = require('http-errors');
  next(createError(404));
});

// Handle all internal server errors.
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page.
  res.status(err.status || 500);
  res.render('error');
});

// Finally export the application.
module.exports = app;
