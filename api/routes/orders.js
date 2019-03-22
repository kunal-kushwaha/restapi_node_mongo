const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Orders were fetched"
    });
});

router.post('/', (req, res) => {
    // 201 : everything was successful, resource created
    res.status(201).json({
        message: "Order was created"
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Details',
        orderId: req.params.orderId
    })
});

module.exports = router;


