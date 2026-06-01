const { getGithubProfile } = require("../services/githubService");

const {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
  deleteProfile,
  getTopProfiles,
} = require("../models/profileModel");

const analyzeProfile = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username || username.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const githubData = await getGithubProfile(username);

    const currentYear = new Date().getFullYear();

    const createdDate = new Date(githubData.created_at);

    const createdYear = createdDate.getFullYear();

    const accountAgeYears = currentYear - createdYear;

    const score =
      githubData.public_repos * 5 +
      githubData.followers * 3 +
      githubData.following;

    const mysqlDate = createdDate.toISOString().slice(0, 19).replace("T", " ");

    const profileData = {
      username: githubData.login,
      name: githubData.name || "Not Available",
      bio: githubData.bio || "No Bio Available",
      public_repos: githubData.public_repos,
      followers: githubData.followers,
      following: githubData.following,
      profile_url: githubData.html_url,
      avatar_url: githubData.avatar_url,
      account_created_at: mysqlDate,
      account_age_years: accountAgeYears,
      score: score,
    };

    saveProfile(profileData, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
          error: err.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Profile analyzed successfully",
        data: profileData,
      });
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchAllProfiles = (req, res) => {
  getAllProfiles((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  });
};

const fetchSingleProfile = (req, res) => {
  const username = req.params.username;

  getProfileByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: results[0],
    });
  });
};

const removeProfile = (req, res) => {
  const username = req.params.username;

  deleteProfile(username, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  });
};

const fetchTopProfiles = (req, res) => {
  getTopProfiles((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  });
};

module.exports = {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile,
  removeProfile,
  fetchTopProfiles,
};
