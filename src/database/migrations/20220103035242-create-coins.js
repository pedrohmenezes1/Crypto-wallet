module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('coins', {
      wallet_address: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'wallet', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      coin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable('coins'),
};
