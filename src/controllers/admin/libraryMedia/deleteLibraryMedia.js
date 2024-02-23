const { isValidObjectId } = require('mongoose');
const { LibraryMedia } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const deleteLibraryMedia = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
    await LibraryMedia.findByIdAndRemove(id);
    return res.status(200).json({ status: true, message: 'Deleted', data: null });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteLibraryMedia;
