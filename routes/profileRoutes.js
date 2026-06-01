const express = require("express");

const router = express.Router();

const {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile,
  removeProfile,
  fetchTopProfiles,
} = require("../controllers/profileController");

router.post("/analyze/:username", analyzeProfile);

router.get("/profiles", fetchAllProfiles);

router.get("/profiles/:username", fetchSingleProfile);

router.delete("/profiles/:username", removeProfile);

router.get("/top-profiles", fetchTopProfiles);

module.exports = router;
