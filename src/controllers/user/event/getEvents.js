const { Event } = require("../../../models");

module.exports = async function (req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total_data = await Event.countDocuments({
      date: { $gte: new Date() },
    });
    const total_page = Math.ceil(total_data / limit);

    const events = await Event.find({ date: { $gte: new Date() } })
      .skip(skip)
      .limit(limit)
      .lean();
    const eventsData = events.map((event) => {
      event.date = new Date(event.date) || "N/A";
      return event;
    });
    return res.status(200).json({
      status: true,
      message: "Events List",
      data: {
        eventsData,
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
