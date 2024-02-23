const { ApiError } = require('../../../errorHandler');
const { InitUser, User } = require('../../../models');
const { STATIC_OTP } = process.env;

const register = async (req, res, next) => {
  try {
    let { otp, phone } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    if (!otp) throw new ApiError('OTP is required.', 400);

    const initUser = await InitUser.findOne({ phone }).lean();
    if (!initUser) throw new ApiError('Bad request', 400);

    if (Date.now() > new Date(initUser.otp_expiry).getTime()) throw new ApiError('OTP expired', 400);
    if (otp !== initUser.otp && otp !== STATIC_OTP) throw new ApiError('Incorrect OTP', 403);

    const user = new User(initUser);
    user.otp = null;
    user.otp_expiry = undefined;
    await user.save();
    return res.status(200).json({
      status: true,
      message: 'Registered successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
