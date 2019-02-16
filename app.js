
/**
 * Module dependencies.
 */


var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var confirmation = require('./routes/confirmation');
var messages = require('./routes/messages');
var landing = require('./routes/landing');
var releaseForm = require('./routes/releaseForm');
// var confirmation = require('./routes/confirmation');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//var multer  = require('multer');
//var upload = multer();
app.post('/Confirmation', confirmation.view);

app.get('/', landing.view);
app.get('/messages', messages.view);
app.get('/release-form', releaseForm.form);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
