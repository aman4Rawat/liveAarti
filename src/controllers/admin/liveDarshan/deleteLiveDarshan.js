const { isValidObjectId } = require('mongoose');
const { LiveDarshan } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const deleteLiveDarshan = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
    // remove > only delete
    // delete > delete and returns deleted doc
    await LiveDarshan.findByIdAndRemove(id);
    return res.status(200).json({ status: true, message: 'Deleted', data: null });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteLiveDarshan;
