module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('transactions', {
      coin_address: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'coins', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      wallet_address: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'wallet', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      sendTo: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'wallet', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      receiveFrom: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'wallet', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  down: (queryInterface) => queryInterface.dropTable('transactions'),
};
