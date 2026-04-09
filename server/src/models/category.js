'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Post, { foreignKey: 'categoryCode', as: 'posts' });
    }
  }
  Category.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    code: DataTypes.STRING,
    value: DataTypes.STRING,
    subtitle: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categorys',  // chỉ định đúng tên bảng
  });
  return Category;
};