const mongoose = require("mongoose");

const libraryMedia = new mongoose.Schema(
  {
    titleEnglish: { type: String, trim: true, required: true },
    titleHindi: { type: String, trim: true, required: true },
    descEnglish: { type: String, default: "" },
    descHindi: { type: String, default: "" },
    thumbnail: {
      url: { type: String, default: null },
      provider: {
        type: String,
        default: "internal",
        enum: ["internal", "external"],
      },
    },
    url: { type: String, default: null, required: true },
    mediaType: { type: String, default: "audio", enum: ["audio", "video"] },
    lyrics: { type: Map, of: String, default: null }, // key(language):value(lyrics)
    tags: [String],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "libraryMedia",
  }
);

const LibraryMedia = mongoose.model("LibraryMedia", libraryMedia);
module.exports = LibraryMedia;
/*
new Map([
  ['english', 'Some English'],
  ['hindi', 'Some hindi']
])
*/
