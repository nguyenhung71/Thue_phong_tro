'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Overview extends Model {
    static associate(models) {
      Overview.hasOne(models.Post, { foreignKey: 'overviewId', as: 'post' });
    }
  }
  Overview.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    code: DataTypes.STRING,
    target: DataTypes.STRING,
    created: DataTypes.DATE,
    expire: DataTypes.DATE,
    bonus: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Overview',
  });
  return Overview;
};
