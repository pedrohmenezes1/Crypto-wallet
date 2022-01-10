import { Model, DataTypes } from 'sequelize';

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        value: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        send_to: {
          type: DataTypes.CHAR(36),
          defaultValue: {
            references: { model: 'wallet', key: 'address' },
          },
        },
        receive_from: {
          type: DataTypes.CHAR(36),
          defaultValue: {
            references: { model: 'wallet', key: 'address' },
          },
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
      foreignKey: 'coin_address',
    });
    this.belongsTo(models.Wallet, {
      foreignKey: 'wallet_address',
    });
    this.belongsTo(models.Wallet, {
      foreignKey: 'send_to',
    });
    this.belongsTo(models.Wallet, {
      foreignKey: 'receive_from',
    });
  }
}
export default Transactions;
