const getProfile = require("./auth/getProfile");
const login = require("./auth/login");
const updateProfile = require("./auth/updateProfile");
const verifOtp = require("./auth/verifyOtp");
const addLibraryMedia = require("./libraryMedia/addLibraryMedia");
const deleteLibraryMedia = require("./libraryMedia/deleteLibraryMedia");
const getAllLibraryMedia = require("./libraryMedia/getAllLibraryMedia");
const getLibraryMedia = require("./libraryMedia/getLibraryMedia");
const updateLibraryMedia = require("./libraryMedia/updateLibraryMedia");
const addLiveDarshan = require("./liveDarshan/addLiveDarshan");
const deleteLiveDarshan = require("./liveDarshan/deleteLiveDarshan");
const getLiveDarshan = require("./liveDarshan/getLiveDarshan");
const getLiveDarshans = require("./liveDarshan/getLiveDarshans");
const updateLiveDarshan = require("./liveDarshan/updateLiveDarshan");
const addMediaCategory = require("./mediaCategory/addMediaCategory");
const addMediaToCategory = require("./mediaCategory/addMediaToCategory");
const deleteMediaCategory = require("./mediaCategory/deleteMediaCategory");
const getMediaCateogries = require("./mediaCategory/getMediaCategories");
const getMediaCategory = require("./mediaCategory/getMediaCategory");
const removeMediaFromCategory = require("./mediaCategory/removeMediaFromCategory");
const updateMediaCategory = require("./mediaCategory/updateMediaCategory");
const addBanner = require("./banner/addBanner");
const updateBanner = require("./banner/updateBanner");
const deleteBanner = require("./banner/deleteBanner");
const getBanner = require("./banner/getBanner");
const getBanners = require("./banner/getBanners");
const addEvent = require("./event/addEvent");

module.exports = {
  //auth
  login,
  verifOtp,
  getProfile,
  updateProfile,

  // live darshan
  addLiveDarshan,
  updateLiveDarshan,
  deleteLiveDarshan,
  getLiveDarshans,
  getLiveDarshan,

  // Library Media
  addLibraryMedia,
  updateLibraryMedia,
  deleteLibraryMedia,
  getAllLibraryMedia,
  getLibraryMedia,

  // media category
  addMediaCategory,
  updateMediaCategory,
  deleteMediaCategory,
  getMediaCategory,
  getMediaCateogries,
  addMediaToCategory,
  removeMediaFromCategory,

  //banner
  addBanner,
  updateBanner,
  deleteBanner,
  getBanner,
  getBanners,

  //event
  addEvent,
};
