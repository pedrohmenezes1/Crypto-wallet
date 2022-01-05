import { Model, DataTypes } from 'sequelize';

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        defaultScope: {},
        scopes: {},
      }
    );
    return this;
  }

  static associate(models) {} // Associações
}
export default Wallet;
