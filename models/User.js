const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4]
    }
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'User',
});

User.beforeCreate(async (newUserData) => {
  newUserData.password = await bcrypt.hash(newUserData.password, 10);
});

User.beforeUpdate(async (updatedUserData) => {
  updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
});

module.exports = User;
