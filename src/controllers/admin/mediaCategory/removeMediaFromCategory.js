const { isValidObjectId } = require('mongoose');
const { MediaCategory, LibraryMedia } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const removeMediaFromCategory = async (req, res, next) => {
  try {
    const { cat_id, media_id } = req.params;
    if (!isValidObjectId(cat_id)) throw new ApiError('Invalid Media category Id', 400);
    if (!isValidObjectId(media_id)) throw new ApiError('Invalid Media Id', 400);

    const categ = await MediaCategory.findById(cat_id);
    if (!categ) throw new ApiError('Invalid Media category Id', 400);

    const index = categ.media.findIndex((m) => m.toString() === media_id);
    if (index !== -1) {
      categ.media.splice(index, 1);
      await categ.save();
    }

    return res.status(201).json({
      status: true,
      message: 'Media removed',
      data: {
        mediaCategory: categ,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeMediaFromCategory;
