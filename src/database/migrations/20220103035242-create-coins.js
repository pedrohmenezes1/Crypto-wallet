module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('coins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wallet_address: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: { model: 'wallet', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      coin: {
        type: Sequelize.CHAR(3),
      },
      fullname: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('coins'),
};
