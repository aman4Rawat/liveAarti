const { ApiError } = require('../../../errorHandler');
const { Admin } = require('../../../models');
const { getOtp } = require('../../../utils');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
  try {
    let { phone_or_email, password } = req.body;
    if (!phone_or_email || !password) throw new ApiError('Invalid credential', 403);
    const otp = getOtp();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

    const admin = await Admin.findOne({ $or: [{ phone: phone_or_email }, { email: phone_or_email }] });
    if (!admin) throw new ApiError('Invalid credential', 403);

    const match = bcrypt.compare(password, admin.password);
    if (!match) throw new ApiError('Invalid credential', 403);

    admin.otp = otp;
    admin.otp_expiry = otpExpiry;
    await admin.save();
    return res.status(200).json({
      status: true,
      message: 'OTP has been sent',
      data: {
        phone: admin.phone, // send string as "+9143*****789"
        otpExpiry: admin.otp_expiry,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
