"use strict";

const normalizeTableName = (table) => {
  if (typeof table === 'string') return table;
  if (table?.tableName) return table.tableName;
  if (table?.TABLE_NAME) return table.TABLE_NAME;
  return '';
};

const hasTable = async (queryInterface, tableName) => {
  const tables = await queryInterface.showAllTables();
  return tables.map((item) => normalizeTableName(item).toLowerCase()).includes(tableName.toLowerCase());
};

const hasColumn = async (queryInterface, tableName, columnName) => {
  if (!(await hasTable(queryInterface, tableName))) return false;
  const definition = await queryInterface.describeTable(tableName);
  return Object.prototype.hasOwnProperty.call(definition, columnName);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    if (await hasColumn(queryInterface, 'Users', 'avatar')) return;

    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    if (await hasColumn(queryInterface, 'Users', 'avatar')) {
      await queryInterface.removeColumn('Users', 'avatar');
    }
  }
};
