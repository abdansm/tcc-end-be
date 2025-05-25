'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presensis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admins_id: {
        type: Sequelize.INTEGER
      },
      tgl: {
        type: Sequelize.DATE
      },
      kehadiran: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Presensis', {
      fields: ['admins_id'],
      type: 'foreign key',
      name: 'custom_fkey_admins_id',
      references: {
        table: 'Admins',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Presensis');
  }
};