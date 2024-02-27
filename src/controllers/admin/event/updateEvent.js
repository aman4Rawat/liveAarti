const { ApiError } = require("../../../errorHandler");
const { isValidObjectId } = require("mongoose");
const { Notification, Event } = require("../../../models");

module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;
    const { url } = req.body;
    if (!isValidObjectId(id)) throw new ApiError("Invalid id", 400);
    const event = await Event.findById(id);
    if (!event) throw new ApiError("No event found", 400);
    event.url = url;
    await event.save();
    Promise.all(
      event.users.map((user) => {
        return Notification.create({
          userId: user,
          eventId: event._id,
        });
      })
    );

    return res.status(200).json({
      status: true,
      message:
        "Event updated And Notification has been sent to all participant",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};
