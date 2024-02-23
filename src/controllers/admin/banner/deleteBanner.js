const { isValidObjectId } = require('mongoose');
const { Banner } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { deleteOldFile } = require('../../../utils');

const deleteBanner = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
    const banner = await Banner.findByIdAndDelete(id);
    if (banner?.image.provider === 'internal') deleteOldFile(banner.image.url);
    return res.status(200).json({ status: true, message: 'Deleted', data: null });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBanner;
