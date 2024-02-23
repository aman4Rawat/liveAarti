const { ApiError } = require('../../../errorHandler');
const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const { STATIC_OTP, ACCESS_TOKEN_SECRET } = process.env;

const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    if (!otp) throw new ApiError('OTP is required.', 400);

    const user = await User.findOne({ phone });
    if (!user) throw new ApiError('Bad Request', 400);

    if (Date.now() > new Date(user.otp_expiry).getTime()) throw new ApiError('OTP expired.', 400);
    if (user.otp !== otp && otp !== STATIC_OTP) throw new ApiError('Incorrect OTP', 400);

    user.otp_expiry = new Date();
    await user.save();
    const token = jwt.sign({ id: user._id, phone: user.phone }, ACCESS_TOKEN_SECRET);

    return res.status(200).json({
      status: true,
      message: 'Login Successfully.',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyOtp;
