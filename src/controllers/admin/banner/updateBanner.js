const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { getFileUploader } = require('../../../middlewares');
const { Banner } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const upload = getFileUploader('image', 'images/banner');

const updateBanner = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      const id = req.params.id;
      let { title, priority, image, redirectUrl } = req.body;
      if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);

      const banner = await Banner.findById(id);
      if (!banner) throw new ApiError('Invalid Id', 400);

      if (title) banner.title = title;
      if (priority) {
        if (isNaN(priority)) throw new ApiError('Invalid priority', 400);
        banner.priority = priority;
      }
      if (redirectUrl) banner.redirectUrl = redirectUrl;
      if (image) banner.image = { url: image, provider: 'external' };
      if (req.file) banner.image = { url: req.file.path, provider: 'internal' };

      await banner.save();
      return res.status(200).json({
        status: true,
        message: 'Banner updated',
        data: {
          banner,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = updateBanner;
