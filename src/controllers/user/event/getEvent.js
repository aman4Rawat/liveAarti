const { ApiError } = require("../../../errorHandler");
const { Event } = require("../../../models");
const { isValidObjectId } = require("mongoose");

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError("Invalid Id", 400);

    let event = await Event.findById(id).lean();
    if (!event) throw new ApiError("Invalid Id", 404);

    event.date = new Date(event.date) || "N/A";

    return res.status(200).json({
      status: true,
      message: "Event Details",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};
