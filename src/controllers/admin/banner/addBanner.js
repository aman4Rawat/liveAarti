const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { getFileUploader } = require('../../../middlewares');
const { Banner } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const upload = getFileUploader('image', 'images/banner');

const addBanner = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      let { title, priority, image, redirectUrl } = req.body;
      if (!title) throw new ApiError('title is required', 400);

      if (priority && isNaN(priority)) throw new ApiError('Invalid priority', 400);
      const imageObj = {
        url: null,
        provider: 'external',
      };
      if (image) imageObj.url = image;
      if (req.file) {
        imageObj.url = req.file.path;
        imageObj.provider = 'internal';
      }
      if (!imageObj.url) throw new ApiError('Banner image is required', 400);

      const banner = await Banner.create({
        title,
        image: imageObj,
        priority,
        redirectUrl,
      });

      return res.status(201).json({
        status: true,
        message: 'Banner Created',
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

module.exports = addBanner;
