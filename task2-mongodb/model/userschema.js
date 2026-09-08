const mongoose = require("mongoose"); // Import Mongoose

// Create schema for users
const userSchema = new mongoose.Schema({

    name: String,

    email: String,

    age: Number
});

// Create User model using the schema
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;