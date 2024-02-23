const { isValidObjectId } = require('mongoose');
const { LibraryMedia } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getLibraryMedia = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);

    const libraryMedia = await LibraryMedia.findById(id).lean();
    if (!libraryMedia) throw new ApiError('Invalid Id', 404);

    return res.status(200).json({
      status: true,
      message: 'Media Details',
      data: {
        libraryMedia,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getLibraryMedia;
