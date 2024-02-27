const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const event = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    location: { type: String, default: "" },
    thumbnail: {
      url: { type: String, default: null },
      provider: {
        type: String,
        default: "internal",
        enum: ["internal", "external"],
      },
    },
    date: { type: Date, required: true },
    desc: { type: String, default: "" },
    url: { type: String, default: null },
    price: { type: String, required: true }, // participation charge
    users: [{ type: ObjectId, ref: "User" }], //participated users
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "events",
  }
);

const Event = mongoose.model("Event", event);
module.exports = Event;
