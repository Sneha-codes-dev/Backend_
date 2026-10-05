require("dotenv").config(); // Load environment variables from .env file

const express = require("express"); // Import Express
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");


const app = express(); // Create Express application

app.use(express.json());

connectDb();

app.use("/users", userRoutes);

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on localhost...");
});