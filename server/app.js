var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const JWT = require("./util/JWT")

var UserRouter = require('./routes/admin/UserRouter')
var PathRouter = require('./routes/admin/PathRouter')
var CompanyRouter = require('./routes/admin/CompanyRouter')
var TicketRouter = require('./routes/admin/TicketRouter')
var WebTicketRouter = require('./routes/web/TicketRouter')
var StripeRouter = require('./routes/web/StripeRouter')
var BookingRouter = require('./routes/web/BookingRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(UserRouter)
app.use(PathRouter)
app.use(CompanyRouter)
app.use(TicketRouter)
app.use(WebTicketRouter)
app.use(StripeRouter)
app.use(BookingRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if(req.url === '/adminapi/user/login' || req.url === '/adminapi/user/signup'){
    next()
    return
  }

  const token = req.headers['authorization'].split(' ')[1]

  if (token) {
    var payload = JWT.verify(token)
    console.log(payload)
    if(payload) {
      const newToken = JWT.generate({
        _id: payload._id,
        email: payload.email,
        role: payload.role
      },'1d')
      res.header('Authorization',newToken)
      next()
    } else {
      res.status(401).send({errCode:'-1',errorInfo:'token过期'})
    }
  }
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
