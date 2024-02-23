const { ApiError } = require('../../../errorHandler');
const { getFileUploader } = require('../../../middlewares');
const { LiveDarshan } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const upload = getFileUploader('thumbnail', 'images/live_darshan');

const addLiveDarshan = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      let { title, desc, location, thumbnail, url, tags } = req.body;
      if (!title) throw new ApiError('Title is required', 400);
      if (!url) throw new ApiError('URL is required', 400);

      const thumbObj = {
        url: thumbnail,
        provider: 'external',
      };
      if (!thumbnail) {
        const v_id = new URL(url).searchParams.get('v'); //get video id
        thumbObj.url = `https://img.youtube.com/vi/${v_id}/0.jpg`;
      }

      if (req.file) {
        thumbObj.url = req.file.path;
        thumbObj.provider = 'internal';
      }

      const liveDarshan = await LiveDarshan.create({
        title,
        url,
        thumbnail: thumbObj,
        location,
        desc,
        tags: tags && String(tags).split(','),
      });

      return res.status(201).json({
        status: true,
        message: 'Live Darsh added',
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

module.exports = addLiveDarshan;
