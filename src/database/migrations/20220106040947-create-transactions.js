/* module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Transaction', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.DOUBLE,
        required: true,
      },
      datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sendTo: {
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Wallet',
          key: 'address',
          as: 'sendTo',
        },
      },
      receiveFrom: {
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Wallet',
          key: 'address',
          as: 'sendTo',
        },
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('Transaction'),
};
 */
