## NarrativeNet

This is an End-to-End MERN application with user authentication for sharing and posting articles, as well as mini blogs. It allows users to create accounts, log in securely, and interact with the platform by posting their articles and blogs.

### Backend Setup

To get the backend server up and running, please follow these steps:

1. Optionally, you can run the following command to install backend dependencies:

    ```bash
    npm install
    ```

2. Navigate to the backend directory:

    ```bash
    cd server
    npm install
    ```

3. In the backend directory, you'll find an `env.example` file. Duplicate this file and rename it to `.env`.

4. Open the `.env` file and populate it with the required environment variables:

    ```plaintext
    PORT= // PORT
    PASSWORD= // MONGO DB PASSWORD
    MONGO_URL= // YOUR MONGODB URL
    SECRET= // ADD YOUR SECRET KEY
    JWT_EXPIRY= // JWT_EXPIRY PERIOD
    ```

    Add your respective `MONGO_URL`, `SECRET_KEY` etc..

5. Save the `.env` file.

6. Start the server by running the following command:

    ```bash
    node index.js
    ```

    Once launched successfully, you should see the following output in your terminal:

    ```vbnet
    Server running on port 8080
    Database connected
    ```

### Frontend Setup

To begin with the frontend application, follow these steps:

1. Navigate to the frontend directory:

    ```bash
    cd client
    npm install
    ```

2. Run the following command to start the application:

    ```bash
    npm run dev
    ```

    This command will initiate the frontend application.

