const multer = require('multer');
const fs = require('fs');
const { ApiError } = require('../../../errorHandler');
const { deleteOldFile } = require('../../../utils');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/admin')) {
      fs.mkdirSync('public/admin', { recursive: true });
    }
    cb(null, 'public/admin');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `admin-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('profile_image');

const updateProfile = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const admin = req.admin;
      let { name } = req.body;
      if (name) admin.name = name;
      if (req.file) {
        await deleteOldFile(admin.profile_image);
        admin.profile_image = req.file.path;
        console.log(req.file);
      }

      await admin.save();

      return res.status(200).json({
        status: true,
        message: 'Profile updated',
        data: {
          admin,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = updateProfile;
