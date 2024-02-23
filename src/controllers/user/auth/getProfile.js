const { User } = require('../../../models');

const getProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  try {
    return res.status(200).json({
      status: true,
      message: 'User Profile',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getProfile;
