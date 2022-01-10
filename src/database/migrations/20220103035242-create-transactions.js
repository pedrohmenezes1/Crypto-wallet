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
        type: Sequelize.INTEGER,
        references: { model: 'coins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      datetime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      send_to: {
        type: Sequelize.CHAR(36),
        references: { model: 'wallet', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      receive_from: {
        type: Sequelize.CHAR(36),
        references: { model: 'wallet', key: 'address' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('transactions'),
};
