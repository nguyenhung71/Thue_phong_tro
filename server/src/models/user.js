"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });
    }
  }
  User.init({
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      zalo: DataTypes.STRING,
      avatar: DataTypes.TEXT,
      roleId: DataTypes.STRING,
      resetToken: DataTypes.STRING,
      resetTokenExpired: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
