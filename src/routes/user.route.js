const authenticateUser = require("../middlewares/authenticateUser");
const {
  signup,
  register,
  login,
  verifyOtp,
  getProfile,
  updateProfile,
  getLiveDarshan,
  getLiveDarshans,
  getSimilarLiveDarshans,
  getMediaCategories,
  getMediaCategory,
  getLibraryMedia,
  getBanners,
  getBanner,
  getEvent,
  getEvents,
  participateEvent,
} = require("../controllers/user");

const userRoute = require("express").Router();

//---------- user auth ----------
userRoute.post("/signup", signup);
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/verify_otp", verifyOtp);
userRoute.get("/profile", authenticateUser, getProfile);
userRoute.patch("/profile", authenticateUser, updateProfile);

//---------- live darshan ----------
userRoute.get("/live_darshans", authenticateUser, getLiveDarshans);
userRoute.get("/live_darshans/:id", authenticateUser, getLiveDarshan);
userRoute.get(
  "/live_darshan_related/:id",
  authenticateUser,
  getSimilarLiveDarshans
);

//---------- library --------
userRoute.get("/media_categories", authenticateUser, getMediaCategories);
userRoute.get("/media_categories/:id", authenticateUser, getMediaCategory);
userRoute.get("/library_media/:id", authenticateUser, getLibraryMedia);

//---------- banners --------
userRoute.get("/banners", authenticateUser, getBanners);
userRoute.get("/banners/:id", authenticateUser, getBanner);

//---------- banners --------
userRoute.get("/event/:id", authenticateUser, getEvent);
userRoute.get("/events", authenticateUser, getEvents);
userRoute.post("/participateEvent", authenticateUser, participateEvent);

module.exports = userRoute;
