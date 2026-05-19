'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      Images.hasOne(models.Post, { foreignKey: 'imagesId', as: 'post' });
    }
  }
  Images.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};