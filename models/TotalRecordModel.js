const mongoose = require('mongoose');

const newTotalSchema = new mongoose.Schema({
    total: { type: Number, required: true } 
})

const TotalRecordModel = mongoose.model("Total", newTotalSchema);
module.exports = TotalRecordModel;