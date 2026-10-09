const User = require("../models/user");


//Create user
const createUser = async(req,res) => {
  try {
    const user = new User(req.body);

    const savedUser = await user.save();

    const userResponse = savedUser.toObject();

    delete userResponse.password;

    res.status(201).json(userResponse);

  } catch(error) {
    
    res.status(500).json({

      message: "Error creating user!"
    });
  }
};

//GET user
const getUsers = async(req,res) => {
  try{
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch(error) {
    res.status(500).json({
      message: "Error retrieving users"
    });
  }
}

//GET User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user"
    });
  }
};

//PUT 
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error updating user"
    });
  }
};

//DELETE
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting user"
    });
  }
};

module.exports = { createUser , getUsers, getUserById, updateUser, deleteUser};
