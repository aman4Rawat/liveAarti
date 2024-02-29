const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { getFileUploader } = require("../../../middlewares");
const { LibraryMedia } = require("../../../models");
const { deleteOldFile } = require("../../../utils");

const upload = getFileUploader("thumbnail", "images/library_media");

const updateLibraryMedia = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      const id = req.params.id;
      if (!isValidObjectId(id)) throw new ApiError("Invalid Id", 400);
      let {
        titleHindi,
        titleEnglish,
        descHindi,
        descEnglish,
        thumbnail,
        url,
        mediaType,
        lyrics,
        tags,
      } = req.body;

      const libraryMedia = await LibraryMedia.findById(id);
      if (!libraryMedia) throw new ApiError("Invalid Id", 400);

      if (titleEnglish) libraryMedia.titleEnglish = titleEnglish;
      if (titleHindi) libraryMedia.titleHindi = titleHindi;
      if (descHindi) libraryMedia.descHindi = descHindi;
      if (descEnglish) libraryMedia.descEnglish = descEnglish;
      if (url) libraryMedia.url = url;
      if (mediaType) {
        if (mediaType !== "audio" && mediaType !== "video")
          throw new ApiError("invalid Media type", 400);
        libraryMedia.mediaType = mediaType;
      }
      if (thumbnail)
        libraryMedia.thumbnail = { url: thumbnail, provider: "external" };
      if (req.file)
        libraryMedia.thumbnail = { url: req.file.path, provider: "internal" };
      if (lyrics) {
        try {
          libraryMedia.lyrics = JSON.parse(lyrics);
        } catch (error) {
          console.log("error while parsing lyrics", error);
          throw new ApiError("Invalid Lyrics: Unable to parse", 400);
        }
      }
      if (tags) libraryMedia.tags = String(tags).split(",");

      await libraryMedia.save();
      return res.status(200).json({
        status: true,
        message: "Media updated",
        data: {
          libraryMedia,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = updateLibraryMedia;
