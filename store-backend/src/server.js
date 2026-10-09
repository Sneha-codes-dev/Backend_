
require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/api/status", (req, res) => {
    res.json({
        status: "OK",
        message: "Store API is running"
    });
});

app.post("/api/test", (req, res) => {
    console.log(req.body);

    res.json({
        message: "Data received successfully",
        data: req.body
    });
});

app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on localhost:${process.env.PORT}`);
})
