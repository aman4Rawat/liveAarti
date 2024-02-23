const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { getFileUploader } = require('../../../middlewares');
const { MediaCategory, LibraryMedia } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const upload = getFileUploader('thumbnail', 'images/media_category');

const addMediaCategory = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      let { name, desc, thumbnail, media } = req.body;
      if (!name) throw new ApiError('name is required', 400);

      if (media) {
        media = media.split(',');
        if (media.some((id) => !isValidObjectId(id))) throw new ApiError('Invalid media Id', 400);
        for (let i = 0; i < media.length; i++) {
          const id = media[i];
          const find = await LibraryMedia.findById(id).select('_id').lean();
          if (!find) throw new ApiError('Invalid media Id', 404);
        }
      }

      const thumbObj = {
        url: thumbnail,
        provider: 'external',
      };

      if (req.file) {
        thumbObj.url = req.file.path;
        thumbObj.provider = 'internal';
      }

      if (!thumbObj.url) throw new ApiError('Thumbnail required', 400);

      const mediaCategory = await MediaCategory.create({
        name,
        desc,
        thumbnail: thumbObj,
      });

      return res.status(201).json({
        status: true,
        message: 'Media Category Created',
        data: {
          mediaCategory,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = addMediaCategory;
