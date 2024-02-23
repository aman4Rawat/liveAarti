const { ApiError } = require('../../../errorHandler');
const { User, InitUser } = require('../../../models');
const { getOtp } = require('../../../utils');

const signup = async (req, res, next) => {
  try {
    let { phone, email, name } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    if (!email) throw new ApiError('Email id is required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('e') || phone.includes('.') || phone.length > 10) {
      throw new ApiError('Invalid phone number.', 400);
    }
    const otp = getOtp();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2min

    const find = await User.findOne({ $or: [{ phone }, { email }] }).lean();
    if (find) throw new ApiError('User is alredy registered with these credentials', 400);

    let initUser = await InitUser.findOne({ phone });
    if (!initUser) initUser = new InitUser({ phone });

    initUser.email = email;
    if (name) initUser.name = name;
    initUser.otp = otp;
    initUser.otp_expiry = otpExpiry;
    await initUser.save();
    //send otp
    return res.status(200).json({
      status: true,
      message: 'OTP has been sent',
      data: {
        phone: initUser.phone,
        otpExpiry: initUser.otp_expiry,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
