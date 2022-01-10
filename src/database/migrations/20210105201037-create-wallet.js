module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('wallet', {
      address: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.CHAR(14),
        unique: true,
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(6),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE(6),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE(6),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('wallet'),
};
