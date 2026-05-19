'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    static associate(models) {
      Attribute.hasOne(models.Post, { foreignKey: 'attributeId', as: 'post' });
    }
  }
  Attribute.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    price: DataTypes.STRING,
    acreage: DataTypes.STRING,
    published: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Attribute',
  });
  return Attribute;
};