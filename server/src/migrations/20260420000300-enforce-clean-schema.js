'use strict';

const normalizeTableName = (table) => {
  if (typeof table === 'string') return table;
  if (table?.tableName) return table.tableName;
  if (table?.TABLE_NAME) return table.TABLE_NAME;
  return '';
};

const resolveTableName = async (queryInterface, expectedTableName) => {
  const tables = await queryInterface.showAllTables();
  const matched = tables.find((table) => normalizeTableName(table).toLowerCase() === expectedTableName.toLowerCase());
  return matched ? normalizeTableName(matched) : null;
};

const hasColumn = async (queryInterface, expectedTableName, columnName) => {
  const tableName = await resolveTableName(queryInterface, expectedTableName);
  if (!tableName) return false;
  const definition = await queryInterface.describeTable(tableName);
  return Object.prototype.hasOwnProperty.call(definition, columnName);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const postsTable = await resolveTableName(queryInterface, 'Posts');
    if (postsTable && (await hasColumn(queryInterface, postsTable, 'labelCode'))) {
      await queryInterface.removeColumn(postsTable, 'labelCode');
    }

    const usersTable = await resolveTableName(queryInterface, 'Users');
    if (usersTable && (await hasColumn(queryInterface, usersTable, 'resetToken'))) {
      await queryInterface.removeColumn(usersTable, 'resetToken');
    }
    if (usersTable && (await hasColumn(queryInterface, usersTable, 'resetTokenExpired'))) {
      await queryInterface.removeColumn(usersTable, 'resetTokenExpired');
    }

    const overviewsTable = await resolveTableName(queryInterface, 'Overviews');
    if (overviewsTable && (await hasColumn(queryInterface, overviewsTable, 'area'))) {
      await queryInterface.removeColumn(overviewsTable, 'area');
    }
    if (overviewsTable && (await hasColumn(queryInterface, overviewsTable, 'type'))) {
      await queryInterface.removeColumn(overviewsTable, 'type');
    }

    const labelsTable = await resolveTableName(queryInterface, 'Labels');
    if (labelsTable) {
      await queryInterface.dropTable(labelsTable);
    }
  },

  async down(queryInterface, Sequelize) {
    const labelsTable = await resolveTableName(queryInterface, 'Labels');
    if (!labelsTable) {
      await queryInterface.createTable('Labels', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        code: {
          type: Sequelize.STRING,
        },
        value: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      });
    }

    const postsTable = await resolveTableName(queryInterface, 'Posts');
    if (postsTable && !(await hasColumn(queryInterface, postsTable, 'labelCode'))) {
      await queryInterface.addColumn(postsTable, 'labelCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    const usersTable = await resolveTableName(queryInterface, 'Users');
    if (usersTable && !(await hasColumn(queryInterface, usersTable, 'resetToken'))) {
      await queryInterface.addColumn(usersTable, 'resetToken', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (usersTable && !(await hasColumn(queryInterface, usersTable, 'resetTokenExpired'))) {
      await queryInterface.addColumn(usersTable, 'resetTokenExpired', {
        type: Sequelize.BIGINT,
        allowNull: true,
      });
    }

    const overviewsTable = await resolveTableName(queryInterface, 'Overviews');
    if (overviewsTable && !(await hasColumn(queryInterface, overviewsTable, 'area'))) {
      await queryInterface.addColumn(overviewsTable, 'area', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '0',
      });
    }
    if (overviewsTable && !(await hasColumn(queryInterface, overviewsTable, 'type'))) {
      await queryInterface.addColumn(overviewsTable, 'type', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  }
};
