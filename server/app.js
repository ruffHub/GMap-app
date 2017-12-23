const
  express = require('express'),
  path = require('path'),
  allowCors = require('./middleware/allow_cors'),
  bodyParser = require('body-parser'),
  schemas = require('./validations/schemas'),
  expressJoi = require('express-joi-validator'),
  routes = require('./routes/index'),
  users = require('./routes/users'),
  auth = require('./routes/auth'),
  register = require('./routes/register'),
  locations = require('./routes/locations'),
  config = require('./config/config'),
  app = express();

app.set('superSecret', config.secret);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(allowCors);

app.use('/api/v1', routes);
app.use('/api/v1/auth', expressJoi(schemas.auth), auth);
app.use('/api/v1/register', expressJoi(schemas.register), register);
app.use('/api/v1/users', expressJoi(schemas.users), users);
app.use('/api/v1/locations', expressJoi(schemas.locations), locations);

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	});
});

module.exports = app;