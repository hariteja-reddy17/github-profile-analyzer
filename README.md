# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a Node.js backend application that fetches public GitHub user data using the GitHub API, analyzes the profile, stores useful insights in a MySQL database, and provides APIs to retrieve stored analysis results.

## Features

* Analyze GitHub profiles using GitHub username
* Fetch data from GitHub Public API
* Store profile insights in MySQL
* Calculate profile score based on repositories and followers
* Calculate account age
* Fetch all analyzed profiles
* Fetch a single analyzed profile
* Delete stored profiles
* Fetch top profiles sorted by score
* Built-in API documentation endpoint

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub API
* Axios
* dotenv
* cors

## Project Structure

```text
config/
controllers/
models/
routes/
services/
server.js
```

## Installation

1. Clone repository

```bash
git clone https://github.com/hariteja-reddy17/github-profile-analyzer.git
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

4. Start server

```bash
npm run dev
```

## Database

Create database:

```sql
CREATE DATABASE github_analyzer;
```

Create table:

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    public_repos INT,
    followers INT,
    following INT,
    profile_url VARCHAR(255),
    avatar_url VARCHAR(255),
    account_created_at DATETIME,
    account_age_years INT,
    score INT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/analyze/:username
```

### Get All Profiles

```http
GET /api/profiles
```

### Get Single Profile

```http
GET /api/profiles/:username
```

### Delete Profile

```http
DELETE /api/profiles/:username
```

### Top Profiles

```http
GET /api/top-profiles
```

### API Documentation

```http
GET /api/docs
```

## Author

Hari Teja Reddy
