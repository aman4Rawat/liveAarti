const { isValidObjectId } = require('mongoose');
const { LiveDarshan } = require('../../../models');

const getSimilarLiveDarshans = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const liveDarshan = await LiveDarshan.findById(id).lean();
    if (!liveDarshan) throw new ApiError('Invalid Id', 404);

    const total_data = await LiveDarshan.countDocuments({ tags: { $in: liveDarshan.tags } });
    const total_page = Math.ceil(total_data / limit);

    const liveDarshans = await LiveDarshan.find({ tags: { $in: liveDarshan.tags } })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      status: true,
      message: 'Live Darshan Similar List',
      data: {
        liveDarshans,
        page,
        limit,
        total_page,
        total_data,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSimilarLiveDarshans;
