'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      roleId: DataTypes.STRING,
      resetToken: DataTypes.STRING,
      resetTokenExpired: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
