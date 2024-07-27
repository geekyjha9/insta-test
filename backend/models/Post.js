// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Import User model for association

const Post = sequelize.define('Post', {
    caption: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hashtag: {
        type: DataTypes.STRING,
        allowNull: true, // Making hashtag optional
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false, // Each post must have a user
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});



// Export the model
module.exports = Post;
