import { Model, DataTypes } from 'sequelize';

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        address: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
          },
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
          },
        },
        birthdate: {
          type: DataTypes.STRING,
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
        tableName: 'wallet',
      }
    );
    return this;
  }

  // Associações
  static associate(models) {
    this.hasMany(models.Coins, {
      foreignKey: 'wallet_address',
      as: 'coinsAddress',
    });
    this.hasMany(models.Transactions, {
      foreignKey: 'wallet_address',
      as: 'transactionsAddress',
    });
  }
}
export default Wallet;
