const { ApiError } = require('../../../errorHandler');
const { getFileUploader } = require('../../../middlewares');
const { deleteOldFile } = require('../../../utils');

const upload = getFileUploader('profile_image', 'images/users');
const genders = ['male', 'female', 'other'];

const updateProfile = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const user = req.user;
      let { name, dob, gotra, gender, profile_image } = req.body;
      if (name) user.name = name;
      if (gotra) user.gotra = gotra;
      if (dob) {
        if (isNaN(new Date(dob).getTime())) throw new ApiError('Invalid DOB', 400);
        user.dob = dob;
      }
      if (gender) {
        if (!genders.includes(gender)) throw new ApiError('Invalid gender', 400);
        user.gender = gender;
      }
      if (profile_image) {
        user.profile_image = {
          url: profile_image,
          provider: 'external',
        };
      }
      if (req.file) {
        await deleteOldFile(user.profile_image);
        user.profile_image = {
          url: req.file.path,
          provider: 'internal',
        };
      }

      await user.save();
      return res.status(200).json({
        status: true,
        message: 'User profile updated.',
        data: {
          user,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = updateProfile;
