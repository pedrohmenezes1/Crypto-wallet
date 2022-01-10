import { Model, DataTypes } from 'sequelize';

class TransferCoin extends Model {
  static init(sequelize) {
    super.init(
      {
        receive_from: {
          type: DataTypes.CHAR(36),
          defaultValue: {
            references: { model: 'wallet', key: 'address' },
          },
        },
        quote_to: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
            isUppercase: true,
            isAlpha: {
              msg: 'Digite apenas letras!',
            },
          },
        },
        current_coin: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
            isUppercase: true,
            isAlpha: {
              msg: 'Digite apenas letras!',
            },
          },
        },
        value: {
          type: DataTypes.DOUBLE,
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
      }
    );
    return this;
  }

  // Associações
  static associate(models) {
    this.belongsTo(models.Wallet, {
      foreignKey: 'receive_from',
    });
  }
}
export default TransferCoin;
