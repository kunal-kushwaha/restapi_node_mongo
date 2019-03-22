const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')
// anything starting with /products will be forwarded to products.js file
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;