import { Model, DataTypes } from 'sequelize';

class Coins extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          allowNull: false,
          primaryKey: true,
        },
        coin: {
          type: DataTypes.ENUM(['BTC', 'ETH', 'USD', 'BRL']),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
          },
        },
        fullname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
          },
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
      foreignKey: 'coin_id',
      as: 'coins',
    });
  }
}
export default Coins;
