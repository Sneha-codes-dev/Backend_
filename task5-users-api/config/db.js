const mongoose = require("mongoose");
//require("dotenv").config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected Successfully!!");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}
module.exports = connectDB;