const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/products')

router.get('/', (req, res) => {
    // send all
    Product.find({})
        .exec()
        .then(docs => {
            console.log(docs);
            // can use this commented lines for empty array but it's not really an error but still.
            // if(docs.length >= 0)
            // {
                res.status(200).json(docs);
            // }
            // else{
            //     res.status(404).json({
            //         message: 'No entries found'
            //     })
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    // provided by mongoose, this will store it in database
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /products",
            createProduct: result
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    // if dont wanna do it can also do it like product.save((err, result) => {} )

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database ", doc);
            if(doc){    // if doc != null : will be null if id which does not exist is passed in url
                res.status(200).json(doc);
            }else{
                res.status(404).json({message: 'No valid entry found for provided ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:productId', (req, res, next) => {
    const updateOps = {};
    // this is so that we can change anything or nothing like just chane name or just change price or change both and so on.
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: req.params.productId}, {$set: updateOps })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error : err
            })
        })
    /*
    Send like this in postman :
        [
        {"propName": "name", "value": "Banana"}
        ]
        Send array else it will say that it is not iterable.
        int patch can't add new data like
        {"propName": "priceNew", "value": "7000"}, wont work wont change anything
        because priceNew doesn't exist. you can only change existing ones.
     */

});

router.delete('/:productId', (req, res, next) => {
    Product.remove({_id: req.params.productId})
        .exec() // to get a real promise
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;


