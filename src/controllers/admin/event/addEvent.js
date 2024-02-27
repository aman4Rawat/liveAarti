const { ApiError } = require("../../../errorHandler");
const { Event } = require("../../../models");
const { getFileUploader } = require("../../../middlewares");

const upload = getFileUploader("thumbnail", "images/events");

const addEvent = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      const { name, location, thumbnail, date, desc, url, price } = req.body;
      if (!name) throw new ApiError("Provide valid name", 400);
      if (!location) throw new ApiError("Provide valid location", 400);
      const isExist = await Event.find({ name, location }).lean();
      console.log("isExist", isExist);
      if (isExist.length) throw new ApiError("Event is already exist", 400);
      if (!date || new Date(date) == "Invalid Date")
        throw new ApiError("Provide valid date", 400);
      if (!desc) throw new ApiError("Provide valid desc", 400);
      if (!Number(price)) throw new ApiError("Provide valid price", 400);
      let thumObj = {
        url: thumbnail,
        provider: "external",
      };
      if (req.file) {
        thumObj.url = req.file.path;
        thumObj.provider = "internal";
      }
      if (!thumObj.url) throw new ApiError("Provide valid banner", 400);

      const event = await Event.create({
        name,
        location,
        thumbnail: thumObj,
        date,
        desc,
        url,
        price,
      });

      return res.status(201).json({
        status: true,
        message: "Event added",
        data: {
          event,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = addEvent;
