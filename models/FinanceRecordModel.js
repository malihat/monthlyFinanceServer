const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    // id: { type: String, required: true },
    date: { type: String, required: true },
    store: { type: String, required: true },
    amount: { type: Number, required: true },
    payment: { type: String, required: true },
    image: {type: String }
},
    {
        timestamps: true
    }
)

const FinanceRecordModel = mongoose.model('Finance', financeSchema);
module.exports = FinanceRecordModel;