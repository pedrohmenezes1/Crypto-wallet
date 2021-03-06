import Sequelize from 'sequelize';
import DatabaseConfig from '../config/database';

import Wallet from '../app/models/wallet';
import Coins from '../app/models/coins';
import Transactions from '../app/models/transactions';

// Buffer
const models = [Wallet, Coins, Transactions];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa conexão
    this.connection = new Sequelize(DatabaseConfig);

    // Percorre o vetor e acessa o método inicializador
    models
      .map((model) => model.init(this.connection))
      .map((model) => {
        if (model.associate) model.associate(this.connection.models);
        return model;
      });
  }
}

export default new DataBase();
