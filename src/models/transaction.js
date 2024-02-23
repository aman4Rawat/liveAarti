const mongoose = require('mongoose');

const transaction = new mongoose.Schema(
  {
    // user:
    // txn by admin/user
    // amount
    // type credit debit
    //
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: [true, 'user_id is required'] },
    // to_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    transaction_type: { type: String, enum: ['credit', 'debit'], required: [true, 'transaction_type is required'] },
    transaction_by: { type: String, enum: ['user', 'admin'], required: [true, 'transaction_by is required'] },
    item_type: { type: String, enum: ['recharge'], required: [true, 'item_type is required'] },
    amount: { type: Number, default: 0 },
    item: { type: Object },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'transactions',
  }
);

const Transaction = mongoose.model('Transaction', transaction);
module.exports = Transaction;
