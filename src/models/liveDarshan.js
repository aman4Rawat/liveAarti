const mongoose = require('mongoose');

const liveDarshan = new mongoose.Schema(
  {
    // title: { type: String, trim: true, required: true }, //
    // title: { type: String, trim: true, required: true }, //
    desc: { type: String, default: '' },
    location: { type: String, default: '' },
    thumbnail: {
      url: { type: String, default: null },
      provider: { type: String, default: 'internal', enum: ['internal', 'external'] },
    },
    url: { type: String, default: null, required: true },
    tags: [String],
    isLive: { type: Boolean, default: false },
    isBroken: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'liveDarshans',
  }
);

const LiveDarshan = mongoose.model('LiveDarshan', liveDarshan);
module.exports = LiveDarshan;
