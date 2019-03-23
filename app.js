const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));

// anything starting with /products will be forwarded to products.js file
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// error handling cuz if you reach this line means no route in the above two lines was able to handle the request
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;