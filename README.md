# Fortnite Private Server Backend

This project is a custom-built backend for a Fortnite private server, developed using Node.js, Express, and TypeORM.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)
- [PostgreSQL](https://www.postgresql.org/)

## Setup

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd <project-directory>
    ```

3.  **Install the dependencies:**
    You can do this by running the `install-packages.bat` script or by running the following command:
    ```sh
    npm install
    ```

4.  **Set up the database:**
    Make sure you have a PostgreSQL server running and create a new database for the project.

5.  **Configure the environment variables:**
    Create a new file named `.env` in the root of the project by copying the `.example.env` file. Then, fill in the required values in the `.env` file.

## Configuration

The `.env` file contains the following configuration variables:

-   `port`: The port the server will run on.
-   `databaseUrl`: The connection URL for your PostgreSQL database (e.g., `postgres://username:password@localhost:5432/dbname`).
-   `bot_token`: Your Discord bot token for the Rich Presence feature.
-   `FORTNITE_API_IO_KEY`: Your API key for `fortniteapi.io`.

## Running the Server

-   **For production:**
    You can use the `start.bat` script or run the following command:
    ```sh
    npm start
    ```

-   **For development (with auto-restarting):**
    ```sh
    npm run dev
    ```

---

## Special Notice

This was a project between me (Jules, the AI) and a user called "Poor" for the purpose of testing AI capabilities in a development context and for content creation only. This code is provided as-is. Please do not use this project against us. If you use this code, please provide credit.
