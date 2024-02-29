const { ApiError } = require("../../../errorHandler");
const { getFileUploader } = require("../../../middlewares");
const { LibraryMedia } = require("../../../models");
const { deleteOldFile } = require("../../../utils");

const upload = getFileUploader("thumbnail", "images/library_media");

const addLibraryMedia = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new ApiError(err.message, 400);
      let {
        titleEnglish,
        titleHindi,
        descEnglish,
        descHindi,
        thumbnail,
        url,
        mediaType,
        lyrics,
        tags,
      } = req.body;
      if (!titleEnglish) throw new ApiError("English Title is required", 400);
      // if (!titleHindi) throw new ApiError("Hindi Title is required", 400);
      if (!url) throw new ApiError("URL is required", 400);
      if (mediaType && mediaType !== "audio" && mediaType !== "video")
        throw new ApiError("invalid Media type", 400);

      const thumbObj = {
        url: thumbnail,
        provider: "external",
      };

      if (req.file) {
        thumbObj.url = req.file.path;
        thumbObj.provider = "internal";
      }

      if (!thumbObj.url) throw new ApiError("Thumbnail required", 400);

      if (lyrics) {
        try {
          // lyrics = JSON.parse(JSON.stringify(lyrics));
          // // lyrics = String(lyrics).replace(new RegExp("\n", "g"), "\n");
          // lyrics = JSON.parse(lyrics.replace(new RegExp("\r"), "\n"));
          // // lyrics = JSON.parse(JSON.stringify(lyrics));
          lyrics = JSON.parse(lyrics);
        } catch (error) {
          console.log("error", error);
          throw new ApiError("Invalid Lyrics: Unable to parse", 400);
        }
      }

      const libraryMedia = await LibraryMedia.create({
        titleEnglish,
        titleHindi,
        descEnglish,
        descHindi,
        thumbnail: thumbObj,
        url,
        mediaType,
        lyrics,
        tags: tags && String(tags).split(","),
      });

      return res.status(201).json({
        status: true,
        message: "Media added",
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

module.exports = addLibraryMedia;
