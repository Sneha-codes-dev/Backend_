const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { registerUser };