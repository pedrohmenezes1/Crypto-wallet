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
    this.belongsToMany(
      models.Coins,
      { through: models.Transactions },
      {
        foreignKey: 'wallet_address',
      }
    );
  }
}
export default Wallet;
