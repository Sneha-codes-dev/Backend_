require("dotenv").config(); // Load environment variables from .env file

const express = require("express"); // Import Express
const mongoose = require("mongoose"); // Import Mongoose
const User = require("./model/userschema"); // Import User model

const app = express(); // Create Express application

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected Successfully!!");
    })
    .catch((err) => {
        console.log(err);
    });

// Create GET API for home page
app.get("/", (req, res) => {
    res.send("Welcome to Stackly!!");
});

// GET API to retrieve users from MongoDB
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users"
        });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on localhost...");
});