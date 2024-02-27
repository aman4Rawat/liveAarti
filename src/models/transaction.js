const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const transaction = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: [true, "user_id is required"],
    },
    transactionId: { type: String, required: true },
    eventId: { type: ObjectId, required: true },
    amount: { type: Number, default: 0 },
    transaction_by: {
      type: String,
      enum: ["user", "admin"],
      required: [true, "transaction_by is required"],
    },
    status: { type: String, default: "pending" },
    mode: { type: String, default: "N/A" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "transactions",
  }
);

const Transaction = mongoose.model("Transaction", transaction);
module.exports = Transaction;
