var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var dbConfig = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'pizzaDelivery',
    charset  : 'UTF8_GENERAL_CI'
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

var User = bookshelf.Model.extend({
  tableName: 'users'
});

User.collection().fetch().then(function (collection) {
  console.log(collection);
});

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// elsewhere, to use the bookshelf client:
var bookshelf = app.get('bookshelf');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  res.send('index');
});

app.get('/orders', function (req, res) {
  res.send('get lista de pedidos');
});

app.get('/items', function (req, res) {
  res.send('get pizzas');
});

app.get('/users', function (req, res) {
  res.send('get users');
});

app.get('/orders', function (req, res) {
  res.send('get lista de pedidos');
});

app.get('/items', function (req, res) {
  res.send('get menu');
});

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

app.get('/api/users', function (req, res) {
  res.json({ user: 'tobi' });
});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
})

app.listen(3000, function () {
  console.log('Pizza delivery app listening on port http://localhost:3000!');
});
