import { Model, DataTypes } from 'sequelize';

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        address: {
          type: DataTypes.CHAR(36),
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
          required: true,
        },
        name: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
          },
        },
        cpf: {
          type: DataTypes.CHAR(14),
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
          },
        },
        birthdate: {
          type: DataTypes.STRING,
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
      as: 'coins',
    });
    this.hasMany(models.Transactions, {
      foreignKey: 'wallet_address',
    });
  }
}
export default Wallet;
