const { ApiError } = require('../../../errorHandler');
const { Admin } = require('../../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { admin_pub_field } = require('../../../models/modelKeys');
const { STATIC_OTP, ACCESS_TOKEN_SECRET } = process.env;

const userVerifOtp = async (req, res, next) => {
  try {
    const { phone_or_email, password, otp } = req.body;
    if (!phone_or_email || !password) throw new ApiError('Invalid credential: required', 403);
    if (!otp) throw new ApiError('OTP is required.', 400);

    const admin = await Admin.findOne({ $or: [{ phone: phone_or_email }, { email: phone_or_email }] });
    if (!admin) throw new ApiError('Invalid credential: 404', 403);

    const match = bcrypt.compare(password, admin.password);
    if (!match) throw new ApiError('Invalid credential: pass403', 403);

    if (Date.now() > new Date(admin.otp_expiry).getTime()) throw new ApiError('OTP expired.', 400);
    if (admin.otp !== otp && otp !== STATIC_OTP) throw new ApiError('Invalid OTP', 400);

    admin.otp_expiry = new Date();
    await admin.save();

    const token = jwt.sign({ id: admin._id }, ACCESS_TOKEN_SECRET);

    return res.status(200).json({
      status: true,
      message: 'Login Successfully.',
      data: {
        token,
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userVerifOtp;
