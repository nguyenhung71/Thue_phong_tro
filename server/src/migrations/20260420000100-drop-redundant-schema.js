'use strict';

const normalizeTableName = (table) => {
  if (typeof table === 'string') return table;
  if (table?.tableName) return table.tableName;
  if (table?.TABLE_NAME) return table.TABLE_NAME;
  return '';
};

const listTables = async (queryInterface) => {
  const tables = await queryInterface.showAllTables();
  return tables.map(normalizeTableName);
};

const hasTable = async (queryInterface, tableName) => {
  const tables = await listTables(queryInterface);
  return tables.map((item) => item.toLowerCase()).includes(tableName.toLowerCase());
};

const hasColumn = async (queryInterface, tableName, columnName) => {
  if (!(await hasTable(queryInterface, tableName))) return false;
  const definition = await queryInterface.describeTable(tableName);
  return Object.prototype.hasOwnProperty.call(definition, columnName);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    if (await hasColumn(queryInterface, 'Posts', 'labelCode')) {
      await queryInterface.removeColumn('Posts', 'labelCode');
    }

    if (await hasColumn(queryInterface, 'Users', 'resetToken')) {
      await queryInterface.removeColumn('Users', 'resetToken');
    }

    if (await hasColumn(queryInterface, 'Users', 'resetTokenExpired')) {
      await queryInterface.removeColumn('Users', 'resetTokenExpired');
    }

    if (await hasColumn(queryInterface, 'Overviews', 'area')) {
      await queryInterface.removeColumn('Overviews', 'area');
    }

    if (await hasColumn(queryInterface, 'Overviews', 'type')) {
      await queryInterface.removeColumn('Overviews', 'type');
    }

    if (await hasTable(queryInterface, 'Labels')) {
      await queryInterface.dropTable('Labels');
    }
  },

  async down(queryInterface, Sequelize) {
    if (!(await hasTable(queryInterface, 'Labels'))) {
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

    if (!(await hasColumn(queryInterface, 'Posts', 'labelCode'))) {
      await queryInterface.addColumn('Posts', 'labelCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!(await hasColumn(queryInterface, 'Users', 'resetToken'))) {
      await queryInterface.addColumn('Users', 'resetToken', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!(await hasColumn(queryInterface, 'Users', 'resetTokenExpired'))) {
      await queryInterface.addColumn('Users', 'resetTokenExpired', {
        type: Sequelize.BIGINT,
        allowNull: true,
      });
    }

    if (!(await hasColumn(queryInterface, 'Overviews', 'area'))) {
      await queryInterface.addColumn('Overviews', 'area', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '0',
      });
    }

    if (!(await hasColumn(queryInterface, 'Overviews', 'type'))) {
      await queryInterface.addColumn('Overviews', 'type', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  }
};
