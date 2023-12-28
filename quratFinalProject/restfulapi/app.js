const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const sessionAuth = require('./middlewares/sessionAuth');
const admin = require('./middlewares/admin');
const logger = require('./middlewares/logger');

const usersRouter = require('./routes/api/users');
const productsRouter = require('./routes/api/products');
const authRoutes = require('./routes/site/auth');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.resolve('./views'));
app.use(expressLayouts);

app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logger);
app.use(require('./middlewares/common'));

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/', authRoutes);

app.get('/homepage', (req, res) => {
  res.render('homepage');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/products', (req, res) => {
  res.render('products');
});


app.use('/admin', sessionAuth, admin, require('./routes/admin/products'));

app.use('/', require('./routes/site/auth'));
app.use('/', require('./routes/api/products'));
app.use('/', require('./routes/api/orders'));

mongoose
  .connect('mongodb://localhost/mernstack', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo....'))
  .catch((error) => console.log(error.message));

module.exports = app;
