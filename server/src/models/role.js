"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // 1 Role có nhiều User
      Role.hasMany(models.User, {
        foreignKey: "roleId",
        as: "users",
      });
    }
  }

  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );

  return Role;
};