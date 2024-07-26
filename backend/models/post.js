// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
  caption: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hashtag: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Post;
