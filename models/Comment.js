const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Comment = sequelize.define('Comment', {
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Comment;
