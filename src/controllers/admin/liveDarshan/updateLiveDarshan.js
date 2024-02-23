const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { getFileUploader } = require('../../../middlewares');
const { LiveDarshan } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const upload = getFileUploader('thumbnail', 'images/live_darshan');

const updateLiveDarshan = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      const id = req.params.id;
      if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
      let { title, desc, location, url, thumbnail, tags, isLive, isBroken } = req.body;

      const liveDarshan = await LiveDarshan.findById(id);
      if (!liveDarshan) throw new ApiError('Invalid Id', 400);

      if (title) liveDarshan.title = title;
      if (desc) liveDarshan.desc = desc;
      if (location) liveDarshan.location = location;
      if (url) liveDarshan.url = url;
      if (thumbnail) liveDarshan.thumbnail = { url: thumbnail, provider: 'external' };
      if (!thumbnail && url) {
        const v_id = new URL(url).searchParams.get('v');
        liveDarshan.thumbnail = { url: `https://img.youtube.com/vi/${v_id}/0.jpg`, provider: 'external' };
      }
      if (req.file) liveDarshan.thumbnail = { url: req.file.path, provider: 'internal' };
      if (tags) liveDarshan.tags = String(tags).split(',');
      if (isLive) {
        if (isLive !== 'true' && isLive !== 'false') throw new ApiError('Invalid isLive value', 400);
        liveDarshan.isLive = isLive === 'true' ? true : false;
      }
      if (isBroken) {
        if (isBroken !== 'true' && isBroken !== 'false') throw new ApiError('Invalid isBroken value', 400);
        liveDarshan.isBroken = isBroken === 'true' ? true : false;
      }
      await liveDarshan.save();
      return res.status(201).json({
        status: true,
        message: 'Live Darshan updated',
        data: {
          liveDarshan,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = updateLiveDarshan;
