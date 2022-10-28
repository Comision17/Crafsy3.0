require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session')

/* Implementamos locals dentro de nuestra aplicacion */
const userLogin = require('./middlewares/userLoginCheck')
const dbConnectionTest = require('./middlewares/dbConnectionTest')

/* Livereload */
/* const livereload = require('livereload')
const connectLivereload = require('connect-livereload')

const liveReloadServer = livereload.createServer() */

/* Importacion de rutas */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/* liveReloadServer.watch(path.join(__dirname, 'views')) */
app.set('view engine', 'ejs');

dbConnectionTest()

/* app.use(connectLivereload()) */
app.use(logger('dev'));

/* Trabajar con metodos HTTP (post) */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Trabajar con put y delete */
app.use(methodOverride('_method'))

/* Login e inicio de sesion */
app.use(session({
  secret: "La Comision 17"
}))

app.use(userLogin)

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));

/* Rutas */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

/* Funcion de actualizacion del servidor */
/* liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); */



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
