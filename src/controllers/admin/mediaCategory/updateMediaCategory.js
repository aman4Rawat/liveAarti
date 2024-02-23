const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { getFileUploader } = require('../../../middlewares');
const { MediaCategory, LibraryMedia } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const upload = getFileUploader('thumbnail', 'images/media_category');

const updateMediaCategory = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      const id = req.params.id;
      if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
      let { name, desc, thumbnail, media } = req.body;

      const mediaCategory = await MediaCategory.findById(id);
      if (!mediaCategory) throw new ApiError('Invalid Id', 400);

      if (name) mediaCategory.name = name;
      if (desc) mediaCategory.desc = desc;
      if (media) {
        media = media.split(',');
        if (media.some((id) => !isValidObjectId(id))) throw new ApiError('Invalid media Id', 400);
        for (let i = 0; i < media.length; i++) {
          const id = media[i];
          const find = await LibraryMedia.findById(id).select('_id').lean();
          if (!find) throw new ApiError('Invalid media Id', 404);
        }
        mediaCategory.media = media;
      }

      if (thumbnail) mediaCategory.thumbnail = { url: thumbnail, provider: 'external' };
      if (req.file) mediaCategory.thumbnail = { url: req.file.path, provider: 'internal' };

      await mediaCategory.save();
      return res.status(200).json({
        status: true,
        message: 'Media Category updated',
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

module.exports = updateMediaCategory;
