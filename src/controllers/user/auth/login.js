const { ApiError } = require('../../../errorHandler');
const { User } = require('../../../models');
const { getOtp } = require('../../../utils');

const login = async (req, res, next) => {
  try {
    let { phone } = req.body;
    if (!phone) throw new ApiError('Phone number in required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('e') || phone.includes('.') || phone.length > 10) {
      throw new ApiError('Invalid phone number.', 400);
    }
    const otp = getOtp();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

    const user = await User.findOne({ phone });
    if (!user) throw new ApiError('User not found', 404);
    user.otp = otp;
    user.otp_expiry = otpExpiry;
    await user.save();
    //send otp
    return res.status(200).json({
      status: true,
      message: 'OTP has been sent',
      data: {
        phone: user.phone,
        otpExpiry: user.otp_expiry,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
