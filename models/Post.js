const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/config");

class Post extends Model {}

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: "users",
  //     key: "id",
  //   },
  // },
}, {
  sequelize,
  modelName: "Post"
});

module.exports = Post;
