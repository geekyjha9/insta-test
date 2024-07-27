const sequelize = require('../config/db');
const User = require('./User');
const Post = require('./Post');

// Setup associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'postedBy' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Post,
};
