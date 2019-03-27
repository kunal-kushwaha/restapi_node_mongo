const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node_mongo_rest',
    { useNewUrlParser: true }
    ).then(() => {
        console.log("Database Connected")
});

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());     // will extract JSON and make it easy to read for us

// CORS
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * everyone, can also put something like http://mycoolsite.com
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept, Authorization');
    // so that these headers can be appended to the incoming request

    // check incoming request method
    // NOTE : browser will always send an OPTIONS request before the post/put request is sent.
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');    // tells the browser what it may send
        return res.status(200).json({})
    }
    next()
});

// anything starting with /products will be forwarded to products.js file
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/', (req, res) => {    // this will work, note : if the path is same then this wont run and the above
    // middleware will run. Ex : if the link is not / and it is /products
    res.send("Hey man")
})
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