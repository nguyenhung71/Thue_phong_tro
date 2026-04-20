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
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.STRING,
    value: DataTypes.STRING,
    header: DataTypes.STRING,
    subheader: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categorys',  // chỉ định đúng tên bảng
  });
  return Category;
};
