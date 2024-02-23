const { isValidObjectId } = require('mongoose');
const { LiveDarshan } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getLiveDarshan = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);

    const liveDarshan = await LiveDarshan.findById(id).lean();
    if (!liveDarshan) throw new ApiError('Invalid Id', 404);

    return res.status(200).json({
      status: true,
      message: 'Live Darshan Details',
      data: {
        liveDarshan,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getLiveDarshan;
