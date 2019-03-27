const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productsSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productsSchema);