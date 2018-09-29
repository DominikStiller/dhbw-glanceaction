/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Amount field is required']
    },
    category: {
        type: String
    },
    account: {
        type: Number,
        required: [true, 'Account field is required']
    },
    timestamp: {
        type: String,
        required: [true, 'Timestamp field is required']
    },
    notes: {
        type: String
    },
    recurrence: {
        type: Number
    }
});

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;*/