const { DataTypes } = require('sequelize'); // Import DataTypes from Sequelize
const sequelize = require('../config/db'); // Import the Sequelize instance

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING, // The username is a string
    allowNull: false, // The username cannot be null
    unique: true // The username must be unique
  },
  fullname: {
    type: DataTypes.STRING, // The fullname is a string
    allowNull: false // The fullname cannot be null
  },
  email: {
    type: DataTypes.STRING, // The email is a string
    allowNull: false, // The email cannot be null
    unique: true, // The email must be unique
    validate: {
      isEmail: true // The email must be a valid email format
    }
  },
  password: {
    type: DataTypes.STRING, // The password is a string
    allowNull: false // The password cannot be null
  }
});

module.exports = User; // Export the User model
