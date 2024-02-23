const { Admin } = require('../../../models');
const { adminPubField } = require('../../../models/modelKeys');

const getProfile = async (req, res, next) => {
  const admin = await Admin.findById(req.admin._id).select(adminPubField.toSelectString());
  try {
    return res.status(200).json({
      status: true,
      message: 'Admin Profile',
      data: { admin },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getProfile;
