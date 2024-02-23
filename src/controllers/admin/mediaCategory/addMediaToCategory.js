const { isValidObjectId } = require('mongoose');
const { MediaCategory, LibraryMedia } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const addMediaToCategory = async (req, res, next) => {
  try {
    const { cat_id, media_id } = req.params;
    if (!isValidObjectId(cat_id)) throw new ApiError('Invalid Media category Id', 400);
    if (!isValidObjectId(media_id)) throw new ApiError('Invalid Media Id', 400);

    const categ = await MediaCategory.findById(cat_id);
    if (!categ) throw new ApiError('Invalid Media category Id', 400);
    const media = await LibraryMedia.findById(media_id).lean();
    if (!media) throw new ApiError('Invalid Media Id', 400);

    categ.media.push(media._id);
    const newMedia = categ.media.map((id) => id.toString());
    categ.media = [...new Set(newMedia)];
    await categ.save();
    return res.status(201).json({
      status: true,
      message: 'Media Added',
      data: {
        mediaCategory: categ,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addMediaToCategory;
