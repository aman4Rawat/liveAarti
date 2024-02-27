const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const mediaCategory = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    desc: { type: String, default: "" },
    thumbnail: {
      url: { type: String, default: null },
      provider: {
        type: String,
        default: "internal",
        enum: ["internal", "external"],
      },
    },
    media: [{ type: ObjectId, ref: "LibraryMedia" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "mediaCategories",
  }
);

const MediaCategory = mongoose.model("MediaCategory", mediaCategory);
module.exports = MediaCategory;
