require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", profileRoutes);

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API Running");
});

app.get("/api/docs", (req, res) => {
  res.status(200).json({
    project: "GitHub Profile Analyzer API",
    version: "1.0.0",
    endpoints: [
      {
        method: "POST",
        endpoint: "/api/analyze/:username",
        description: "Analyze a GitHub profile and store insights",
      },
      {
        method: "GET",
        endpoint: "/api/profiles",
        description: "Fetch all analyzed profiles",
      },
      {
        method: "GET",
        endpoint: "/api/profiles/:username",
        description: "Fetch a single analyzed profile",
      },
      {
        method: "DELETE",
        endpoint: "/api/profiles/:username",
        description: "Delete a profile from database",
      },
      {
        method: "GET",
        endpoint: "/api/top-profiles",
        description: "Fetch profiles sorted by score",
      },
    ],
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
