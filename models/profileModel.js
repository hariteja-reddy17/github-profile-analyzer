const db = require("../config/db");

const saveProfile = (profileData, callback) => {
  const query = `
    INSERT INTO github_profiles
    (
        username,
        name,
        bio,
        public_repos,
        followers,
        following,
        profile_url,
        avatar_url,
        account_created_at,
        account_age_years,
        score
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        profile_url = VALUES(profile_url),
        avatar_url = VALUES(avatar_url),
        account_created_at = VALUES(account_created_at),
        account_age_years = VALUES(account_age_years),
        score = VALUES(score)
    `;

  db.query(
    query,
    [
      profileData.username,
      profileData.name,
      profileData.bio,
      profileData.public_repos,
      profileData.followers,
      profileData.following,
      profileData.profile_url,
      profileData.avatar_url,
      profileData.account_created_at,
      profileData.account_age_years,
      profileData.score,
    ],
    callback,
  );
};

const getAllProfiles = (callback) => {
  db.query("SELECT * FROM github_profiles ORDER BY analyzed_at DESC", callback);
};

const getProfileByUsername = (username, callback) => {
  db.query(
    "SELECT * FROM github_profiles WHERE username = ?",
    [username],
    callback,
  );
};

const deleteProfile = (username, callback) => {
  db.query(
    "DELETE FROM github_profiles WHERE username = ?",
    [username],
    callback,
  );
};

const getTopProfiles = (callback) => {
  db.query("SELECT * FROM github_profiles ORDER BY score DESC", callback);
};

module.exports = {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
  deleteProfile,
  getTopProfiles,
};
