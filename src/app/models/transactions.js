import { Model, DataTypes } from 'sequelize';

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        value: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'transactions',
      }
    );
    return this;
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Coins, {
      foreignKey: 'coins_address',
      as: 'coinsAdresses',
    });
    this.belongsTo(models.Wallet, {
      foreignKey: 'sendTo',
      as: 'sendAdresses',
    });
    this.belongsTo(models.Wallet, {
      foreignKey: 'receiveFrom',
      as: 'receiveAdresses',
    });
  }
}
export default Transactions;
