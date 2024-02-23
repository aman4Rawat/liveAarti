const { isValidObjectId } = require('mongoose');
const { MediaCategory } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getMediaCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);

    const mediaCategory = await MediaCategory.findById(id).populate('media', 'title thumbnail').lean();
    if (!mediaCategory) throw new ApiError('Invalid Id', 404);

    return res.status(200).json({
      status: true,
      message: 'Media Cateogory Details',
      data: {
        mediaCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getMediaCategory;
