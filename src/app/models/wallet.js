import { Model, DataTypes } from 'sequelize';

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        address: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
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

  static associate() {} // Associações
}
export default Wallet;
