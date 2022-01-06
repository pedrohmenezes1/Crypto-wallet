module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Wallet', {
      address: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      coin_id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: { model: 'Wallet', key: 'id' },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('Wallet'),
};
