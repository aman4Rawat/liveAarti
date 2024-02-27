const {
  login,
  verifOtp,
  getProfile,
  updateProfile,
  addLiveDarshan,
  updateLiveDarshan,
  deleteLiveDarshan,
  getLiveDarshans,
  getLiveDarshan,
  addLibraryMedia,
  updateLibraryMedia,
  deleteLibraryMedia,
  getAllLibraryMedia,
  getLibraryMedia,
  addMediaCategory,
  updateMediaCategory,
  deleteMediaCategory,
  getMediaCateogries,
  getMediaCategory,
  addMediaToCategory,
  removeMediaFromCategory,
  addBanner,
  updateBanner,
  deleteBanner,
  getBanners,
  getBanner,
  addEvent,
  getEvent,
  getEvents,
  updateEvent,
} = require("../controllers/admin");
const { authenticateAdmin } = require("../middlewares");

const adminRoute = require("express").Router();

//---------- user auth ----------
adminRoute.post("/login", login);
adminRoute.post("/verify_otp", verifOtp);
adminRoute.get("/profile", authenticateAdmin, getProfile);
adminRoute.patch("/profile", authenticateAdmin, updateProfile);

//---------- live darshan --------
adminRoute.post("/live_darshan", authenticateAdmin, addLiveDarshan);
adminRoute.patch("/live_darshan/:id", authenticateAdmin, updateLiveDarshan);
adminRoute.delete("/live_darshan/:id", authenticateAdmin, deleteLiveDarshan);
adminRoute.get("/live_darshans", authenticateAdmin, getLiveDarshans);
adminRoute.get("/live_darshans/:id", authenticateAdmin, getLiveDarshan);

//---------- library media --------
adminRoute.post("/library_media", authenticateAdmin, addLibraryMedia);
adminRoute.patch("/library_media/:id", authenticateAdmin, updateLibraryMedia);
adminRoute.delete("/library_media/:id", authenticateAdmin, deleteLibraryMedia);
adminRoute.get("/all_library_media", authenticateAdmin, getAllLibraryMedia);
adminRoute.get("/library_media/:id", authenticateAdmin, getLibraryMedia);

//---------- media category --------
adminRoute.post("/media_category", authenticateAdmin, addMediaCategory);
adminRoute.patch("/media_category/:id", authenticateAdmin, updateMediaCategory);
adminRoute.delete(
  "/media_category/:id",
  authenticateAdmin,
  deleteMediaCategory
);
adminRoute.get("/media_categories", authenticateAdmin, getMediaCateogries);
adminRoute.get("/media_categories/:id", authenticateAdmin, getMediaCategory);
adminRoute.patch(
  "/media_category/:cat_id/add/:media_id",
  authenticateAdmin,
  addMediaToCategory
);
adminRoute.patch(
  "/media_category/:cat_id/remove/:media_id",
  authenticateAdmin,
  removeMediaFromCategory
);

//---------- banner --------
adminRoute.get("/banners", authenticateAdmin, getBanners);
adminRoute.get("/banner/:id", authenticateAdmin, getBanner);
adminRoute.post("/banner", authenticateAdmin, addBanner);
adminRoute.patch("/banner/:id", authenticateAdmin, updateBanner);
adminRoute.delete("/banner/:id", authenticateAdmin, deleteBanner);

//---------- event --------
adminRoute.post("/event", authenticateAdmin, addEvent);
adminRoute.get("/events", authenticateAdmin, getEvents);
adminRoute.get("/event/:id", authenticateAdmin, getEvent);
adminRoute.patch("/event/:id", authenticateAdmin, updateEvent);

module.exports = adminRoute;
