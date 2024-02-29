const mongoose = require("mongoose");

const liveDarshan = new mongoose.Schema(
  {
    titleEnglish: { type: String, trim: true, required: true },
    titleHindi: { type: String, trim: true, required: true },
    descEnglish: { type: String, default: "" },
    descHindi: { type: String, default: "" },
    location: { type: String, default: "" },
    thumbnail: {
      url: { type: String, default: null },
      provider: {
        type: String,
        default: "internal",
        enum: ["internal", "external"],
      },
    },
    url: { type: String, default: null, required: true },
    tags: [String],
    isLive: { type: Boolean, default: false },
    isBroken: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "liveDarshans",
  }
);

const LiveDarshan = mongoose.model("LiveDarshan", liveDarshan);
module.exports = LiveDarshan;
