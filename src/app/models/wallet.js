import { Model, DataTypes } from 'sequelize';

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
            min: {
              args: [7],
              msg: 'Esse campo deve ter pelo menos 7 caracteres',
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
            isNumeric: {
              msg: 'Preencher apenas com números',
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
            isNumeric: {
              msg: 'Preencher apenas com números',
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
