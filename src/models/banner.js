const mongoose = require('mongoose');

const banner = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    image: {
      url: { type: String, default: null },
      provider: { type: String, default: 'internal', enum: ['internal', 'external'] },
    },
    priority: { type: Number, default: 0 },
    redirectUrl: { type: String, default: null },
  },
  {
    timestamps: true,
    collection: 'banners',
  }
);

const Banner = mongoose.model('Banner', banner);
module.exports = Banner;
