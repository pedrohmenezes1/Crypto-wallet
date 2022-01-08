import { Model, DataTypes } from 'sequelize';

class Coins extends Model {
  static init(sequelize) {
    super.init(
      {
        coin: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        fullname: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'coins',
      }
    );
    return this;
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Wallet, {
      foreignKey: 'wallet_address',
    });
    this.hasMany(models.Transactions, {
      foreignKey: 'coin_address',
    });
  }
}
export default Coins;
