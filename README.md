# Fortend - Fortnite Private Server Backend

Welcome to the Fortend Fortnite private server backend! This project provides the necessary server infrastructure to run a custom Fortnite experience, built with Node.js, Express, and MongoDB.

## ✨ Features

- **Custom Item Shop:** A static, configuration-based item shop.
- **V-Bucks System:** Basic V-Bucks balance tracking for users.
- **Discord Bot Integration:** Manage your server and users with powerful Discord commands.
  - `/register`: Create a new game account.
  - `/delete`: Delete your game account.
  - `/fulllocker` (Admin): Grant a full locker to a user (placeholder).
  - And more!

## Prerequisites

Before you get started, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community)

## 🚀 Getting Started

### 1. Clone the Repository
```sh
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies
Run the included batch file or use npm directly:
```sh
npm install
```

### 3. Configure Your Environment
Create a `.env` file in the root of the project by copying the `.example.env` file. You will need to fill in the following values:

- `MONGODB_URI`: Your connection string for your MongoDB database.
  - Example: `mongodb://localhost:27017/FortendBackend`
- `BOT_TOKEN`: Your Discord bot token.
- `ADMIN_DISCORD_IDS`: A comma-separated list of Discord User IDs for bot admins (e.g., `123456789,987654321`).

### 4. Run the Server
You can run the server in two modes:

- **Production Mode:**
  ```sh
  npm start
  ```
- **Development Mode (with auto-restarting on file changes):**
  ```sh
  npm run dev
  ```

Once the server is running, you should see a confirmation in the console that it has connected to MongoDB and the Discord bot has logged in.

---

## ⚖️ Special Notice

This was a project between the AI assistant, Jules, and the user, Poor, for the purpose of testing AI capabilities in a development context and for content creation. This code is provided as-is. Please do not use this project against us. If you use this code, please provide credit.
