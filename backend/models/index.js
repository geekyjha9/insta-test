const sequelize = require("../config/db");
const User = require("./User.js");
const Post = require("./Post.js");


User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "postedBy" })


module.exports = {
    sequelize,
    Post,
    User
}