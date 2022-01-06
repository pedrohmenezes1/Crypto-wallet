module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Coins', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      coin: {
        type: Sequelize.ENUM(['BTC', 'ETH', 'USD', 'BRL']),
        required: true,
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        required: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('Coins'),
};
