const express = require("express");
const { createUser, getUsers, getUserById , updateUser, deleteUser } = require("../controllers/userController");

const router =  express.Router();

// router.post("/", (req,res) => {
//   res.json({
//     message: "Create user route working!"
//   });
// });

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

module.exports = router;