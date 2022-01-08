module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      coin_address: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'coins', key: 'wallet_address' },
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
      quoteTo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currentCoin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      datetime: {
        type: Sequelize.DATE,
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
      curentCotation: {
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

  down: (queryInterface) => queryInterface.dropTable('transactions'),
};
