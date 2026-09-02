require("dotenv").config();      // Load environment variables from .env file

const express = require("express");           //imports express
const mongoose = require("mongoose");        // Import Mongoose
const User = require("./model/userschema");  // Import User model

const app = express();        //create express application

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected Successfully!!");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {            // Create GET API for home page
    res.send("Welcome to Stackly!!");
});

// GET API to retrieve users
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