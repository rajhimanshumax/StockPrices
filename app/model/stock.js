const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
        id:String,
        name:String,
        last:String,
        buy:String,
        sell:String,
        volume:String,
        base_unit:String

})

module.exports = mongoose.model('stock',stockSchema);