const bcrypt = require('bcryptjs'); // bcryptjs is used for hashing passwords
const User = require('../models/User'); // Import the User model

// Function to handle user registration
const registerUser = async (req, res) => {
    const { username, email, password, fullname } = req.body; // Extract necessary fields from the request body

    try {
        // Check if a user with the provided email already exists in the database
        const existingUserByEmail = await User.findOne({ where: { email } });
        if (existingUserByEmail) {
            // If a user with the provided email already exists, respond with a 422 status code and an error message
            return res.status(422).json({ error: "User already exists with that email" });
        }

        // Check if a user with the provided username already exists in the database
        const existingUserByUsername = await User.findOne({ where: { username } });
        if (existingUserByUsername) {
            // If a user with the provided username already exists, respond with a 422 status code and an error message
            return res.status(422).json({ error: "User already exists with that username" });
        }

        // Hash the provided password before saving it in the database for security reasons
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user in the database using the User model
        const newUser = await User.create({
            username,
            fullname,
            email,
            password: hashedPassword // Store the hashed password instead of the plain text password
        });

        // Respond with a 201 status code and the newly created user object along with a success message
        res.status(201).json({ user: newUser, message: "Registered Successfully" });
    } catch (error) {
        // If any error occurs during the process, respond with a 500 status code and the error message
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser }; // Export the registerUser function for use in other parts of the application
