const mongoose = require('mongoose');

const initUser = new mongoose.Schema(
  {
    phone: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true },
    name: { type: String, trim: true, default: '' },
    otp: { type: String, default: null },
    otp_expiry: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'initUsers',
  }
);

const InitUser = mongoose.model('InitUser', initUser);
module.exports = InitUser;
