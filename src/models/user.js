const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    phone: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true, default: '' },
    otp: { type: String, default: null },
    otp_expiry: { type: Date, default: Date.now },
    country: { type: String, default: 'IN' },
    dob: { type: Date, default: null },
    gotra: { type: String, default: '' },
    gender: { type: String, default: 'male', enum: ['male', 'female', 'other'] },
    profile_image: {
      url: { type: String, default: null },
      provider: { type: String, default: 'internal', enum: ['internal', 'external'] },
    },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'users',
  }
);

const User = mongoose.model('User', user);
module.exports = User;
