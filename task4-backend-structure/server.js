const express = require("express");
const userRoutes = require("./routes/userRoute");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/users", userRoutes);

app.listen(3000, ()=> {
  console.log("Server is running on localhost: 3000");
})