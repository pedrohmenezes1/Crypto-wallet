/* import { Model, DataTypes } from 'sequelize';

class WalletTransaction extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          required: true,
          primaryKey: true,
        },
        value: {
          type: DataTypes.NUMBER,
          defaultValue: 0,
          validate: {
            notEmpty: {
              msg: 'Esse campo não pode ser vazio!',
            },
          },
        },
        datetime: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        sendTo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        receiveFrom: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        currentCotation: {
          type: DataTypes.STRING,
          allowNull: false,
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
export default WalletTransaction;
 */
