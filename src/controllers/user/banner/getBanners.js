const { Banner } = require('../../../models');

const getBanners = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total_data = await Banner.countDocuments();
    const total_page = Math.ceil(total_data / limit);

    const banner = await Banner.find().skip(skip).limit(limit).lean();
    return res.status(200).json({
      status: true,
      message: 'Banner List',
      data: {
        banner,
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

module.exports = getBanners;
