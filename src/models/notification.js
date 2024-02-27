const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const notification = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: [true, "user_id is required"],
    },
    eventId: { type: ObjectId, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "notifications",
  }
);

const Notification = mongoose.model("Notification", notification);
module.exports = Notification;
