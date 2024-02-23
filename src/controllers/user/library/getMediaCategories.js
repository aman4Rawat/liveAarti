const { MediaCategory } = require('../../../models');

const getMediaCategories = async (req, res, next) => {
  try {
    let { tags } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $lookup: {
          from: 'libraryMedia',
          localField: 'media',
          foreignField: '_id',
          as: 'populatedMedia',
        },
      },
    ];
    if (tags) {
      tags = String(tags).split(',');
      pipeline.push({
        $match: {
          'populatedMedia.tags': { $in: tags },
        },
      });
    }
    pipeline.push(
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total_data: [{ $count: 'total_data' }],
        },
      },
      {
        $addFields: {
          total_data: { $first: '$total_data.total_data' },
        },
      },
      {
        $project: {
          'data.populatedMedia': 0,
        },
      }
    );
    const result = await MediaCategory.aggregate(pipeline);

    const mediaCategories = result[0]?.data || [];
    const total_data = result[0]?.total_data || 0;
    const total_page = Math.ceil(total_data / limit);

    return res.status(200).json({
      status: true,
      message: 'Media Categories listing',
      data: {
        mediaCategories,
        page,
        limit,
        total_data,
        total_page,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getMediaCategories;
