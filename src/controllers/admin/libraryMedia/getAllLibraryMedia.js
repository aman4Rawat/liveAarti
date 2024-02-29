const { LibraryMedia } = require("../../../models");

const getAllLibraryMedia = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total_data = await LibraryMedia.countDocuments();
    const total_page = Math.ceil(total_data / limit);

    const libraryMedia = await LibraryMedia.find()
      .skip(skip)
      .limit(limit)
      .lean();
    return res.status(200).json({
      status: true,
      message: "Media List",
      data: {
        libraryMedia,
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

module.exports = getAllLibraryMedia;
