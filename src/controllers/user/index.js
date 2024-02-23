const signup = require('./auth/signup');
const register = require('./auth/register');
const login = require('./auth/login');
const verifyOtp = require('./auth/verifyOtp');
const getProfile = require('./auth/getProfile');
const updateProfile = require('./auth/updateProfile');
const getLiveDarshans = require('./liveDarshan/getLiveDarshans');
const getLiveDarshan = require('./liveDarshan/getLiveDarshan');
const getSimilarLiveDarshans = require('./liveDarshan/getSimilarLiveDarshans');
const getMediaCategories = require('./library/getMediaCategories');
const getMediaCategory = require('./library/getMediaCategory');
const getLibraryMedia = require('./library/getLibraryMedia');
const getBanners = require('./banner/getBanners');
const getBanner = require('./banner/getBanner');

module.exports = {
  signup,
  register,
  verifyOtp,
  login,
  verifyOtp,
  getProfile,
  updateProfile,

  // live darshan
  getLiveDarshans,
  getLiveDarshan,
  getSimilarLiveDarshans,

  // library
  getMediaCategories,
  getLibraryMedia,
  getMediaCategory,

  // banners
  getBanner,
  getBanners,
};
