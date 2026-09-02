const mongoose = require("mongoose");      // Import Mongoose

// Create schema for users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("User", userSchema)    // Create User model using the schema

module.exports = User;