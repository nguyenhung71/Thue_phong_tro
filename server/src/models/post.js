'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Post.belongsTo(models.Category, { foreignKey: 'categoryCode', as: 'category' });
      Post.belongsTo(models.Attribute, { foreignKey: 'attributeId', as: 'attribute' });
      Post.belongsTo(models.Overview, { foreignKey: 'overviewId', as: 'overview' });
      Post.belongsTo(models.Images, { foreignKey: 'imagesId', as: 'images' });
    }
  }
  Post.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    attributeId: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.STRING,
    overviewId: DataTypes.TEXT,
    imagesId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
